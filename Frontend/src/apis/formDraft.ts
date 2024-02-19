import Response from "@interfaces/Response";
import IFormDraft from "@interfaces/FormDraft";
import api from "@services/api";
import { ReactFlowJsonObject } from "reactflow";

export type ReqWorkflow = Response<
  ReactFlowJsonObject & Omit<IFormDraft, "steps">
>;

type ReqFormDrafts = Response<{
  forms: Pick<
    IFormDraft,
    "status" | "_id" | "version" | "owner" | "createdAt"
  >[];
}>;

export const getFormDrafts = async ({
  queryKey: [, workflow_id],
}: {
  queryKey: string[];
}) => {
  const res = await api.get<ReqFormDrafts>(`/form-drafts/${workflow_id}`);

  return res.data.data;
};

export const getFormDraft = async ({
  queryKey: [, id],
}: {
  queryKey: string[];
}) => {
  const res = await api.get<ReqWorkflow>(`/form-draft/${id}`);

  return res.data.data;
};

export const createFormDraft = async (
  data: Pick<IFormDraft, "fields" | "status" | "parent">
) => {
  const res = await api.post<ReqWorkflow>(`/form-draft/${data.parent}`, data);

  return res.data.data;
};

export const publishFormDraft = async (data: Pick<IFormDraft, "_id" | "status">) => {
  const res = await api.patch<ReqWorkflow>(`/form-draft/${data._id}`, data);

  return res.data.data;
};

export const createOrUpdateFormDraft = async (
  data: Pick<IFormDraft, "fields" | "status" | "parent" | "_id">
) => {
  return createFormDraft(data);
};
