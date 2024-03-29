import Http, { HttpHandler } from "../../../middlewares/http";
import res from "../../../utils/apiResponse";
import Form, { IForm } from "../../../models/Form";
import moment from "moment";

const handler: HttpHandler = async (conn, req) => {
  const { id } = req.params;
  const { period, ...formData } = req.body as IForm;

  const form = await new Form(conn).model().findByIdAndUpdate(
    id,
    {
      ...formData,
      period: {
        open: period.open ? moment.utc(period.open).toDate() : null,
        close: period.close ? moment.utc(period.close).toDate() : null,
      },
    },
    {
      new: true,
    },
  );

  form.save();

  return res.created(form);
};

export default new Http(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object({
      id: schema.string().required(),
    }),
    body: schema.object().shape({
      name: schema.string().required().min(3).max(255),
      slug: schema
        .string()
        .required()
        .min(3)
        .max(30)
        .matches(/^[a-z0-9-]+$/),
      type: schema
        .string()
        .required()
        .oneOf(["created", "interaction", "evaluated"]),
      initial_status: schema.string().when("type", ([type], schema) => {
        if (type === "created") {
          return schema.required();
        }
        return schema.nullable().default(null);
      }),
      period: schema.object().shape({
        open: schema.date().required().nullable(),
        close: schema.date().required().nullable(),
      }),
      active: schema.boolean().required().default(true),
      workflow: schema.string().when("type", ([type], schema) => {
        if (type === "created") {
          return schema.required();
        }
        return schema.nullable().default(null);
      }),
      description: schema.string().optional().nullable().default(""),
      published: schema.string().optional().nullable().default(null),
    }),
  }))
  .configure({
    name: "FormUpdate",
    options: {
      methods: ["PUT"],
      route: "form/{id}",
    },
  });
