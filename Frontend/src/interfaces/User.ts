type BaseUser = {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  matriculation: string;
  institute: string;
  active: boolean;
};

type AdminOrStudent = BaseUser & { role: "admin" | "student"; };
type Teacher = BaseUser & { role: "teacher"; university_degree: string; };

type IUser = AdminOrStudent | Teacher;

export default IUser;