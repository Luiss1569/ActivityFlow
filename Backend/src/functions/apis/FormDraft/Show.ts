import Http, { HttpHandler } from "../../../middlewares/http";
import res from "../../../utils/apiResponse";
import FormDraft from "../../../models/FormDraft";

const handler: HttpHandler = async (conn, req) => {
  const { id } = req.params as { id: string };

  const form = await new FormDraft(conn).model().findById(id);

  if (!form) {
    return res.notFound("FormDraft not found");
  }

  return res.success(form);
};

export default new Http(handler)
  .setSchemaValidator((schema) => ({
    params: schema.object({
      id: schema.string().required(),
    }),
  }))
  .configure({
    name: "FormDraftShow",
    options: {
      methods: ["GET"],
      route: "form-draft/{id}",
    },
  });
