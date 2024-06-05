import Http, { HttpHandler } from "../../../middlewares/http";
import res from "../../../utils/apiResponse";
import { IFormType } from "../../../models/client/Form";
import FormRepository from "../../../repositories/Form";
import FilterQueryBuilder, {
  WhereEnum,
} from "../../../utils/filterQueryBuilder";

interface Query {
  page?: number;
  limit?: number;
  type?: IFormType;
  active?: boolean;
  name?: string;
  slug?: string;
}

const filterQueryBuilder = new FilterQueryBuilder({
  type: WhereEnum.ARRAY,
  active: WhereEnum.BOOLEAN,
  name: WhereEnum.ILIKE,
  slug: WhereEnum.ILIKE,
});

const handler: HttpHandler = async (conn, req) => {
  const { page = 1, limit = 10, ...filters } = req.query as Query;

  const formRepository = new FormRepository(conn);

  const where = filterQueryBuilder.build(filters);

  const forms = await formRepository.find({
    skip: (page - 1) * limit,
    where,
    limit,
    select: {
      name: 1,
      type: 1,
      active: 1,
      slug: 1,
    },
  });

  const total = await new FormRepository(conn).count({ where });
  const totalPages = Math.ceil(total / limit);

  return res.success({
    forms,
    pagination: {
      page: Number(page),
      total,
      totalPages,
      count: forms.length + (page - 1) * limit,
    },
  });
};

export default new Http(handler)
  .setSchemaValidator((schema) => ({
    query: schema
      .object({
        page: schema
          .number()
          .optional()
          .transform((v) => Number(v))
          .default(1)
          .min(1),
        limit: schema
          .number()
          .optional()
          .transform((v) => Number(v)),
        type: schema
          .array(schema.mixed().oneOf(Object.values(IFormType)))
          .optional(),
        active: schema.boolean().optional(),
        name: schema.string().min(3).max(255).optional().default(undefined),
        slug: schema.string().min(3).max(255).optional().default(undefined),
      })
      .optional(),
  }))
  .configure({
    name: "FormsList",
    permission: "form.view",
    options: {
      methods: ["GET"],
      route: "forms",
    },
  });
