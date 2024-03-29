import { IAnswer } from "./Answer";
import IFormDraft, { IField } from "./FormDraft";
import IUser from "./User";

export enum IActivityState {
  finished = "finished",
  processing = "processing",
  created = "created",
}

export enum IActivityAccepted {
  accepted = "accepted",
  rejected = "rejected",
  pending = "pending",
}

export default interface IActivity {
  _id: string;
  name: string;
  description: string;
  state: IActivityState;
  form: string;
  status: string;
  protocol: string;
  users: string[];
  masterminds: {
    accepted: IActivityAccepted;
    user: string;
  }[];
  sub_masterminds: string[];
  createdAt: string;
}

export interface IActivityDetails
  extends Omit<
    IActivity,
    "users" | "status" | "masterminds" | "sub_masterminds"
  > {
  status: {
    _id: string;
    name: string;
  };
  users: Pick<IUser, "_id" | "name" | "email" | "matriculation">[];
  masterminds: {
    accepted: "accepted" | "rejected" | "pending";
    user: Pick<IUser, "_id" | "name" | "email" | "matriculation">;
  }[];
  sub_masterminds: Pick<IUser, "_id" | "name" | "email" | "matriculation">[];
  extra_fields: Omit<IAnswer, "user" | "form_draft"> & {
    form_draft: Pick<IFormDraft, "_id"> & {
      fields: (Omit<IField, "value"> &
        (
          | {
              predefined: null;
              value: string;
            }
          | {
              predefined: "student";
              value: {
                _id: string;
                name: string;
                matriculation: string;
                email: string;
              };
            }
        ))[];
    };
  };
}
