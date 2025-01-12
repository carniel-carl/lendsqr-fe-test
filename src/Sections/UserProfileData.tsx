import { formatter } from "../lib/utils";
import "../styles/sections/userprofiledata.scss";
import {
  EducationAndEmployment,
  Guarantor,
  PersonalInformation,
} from "../types/types";

type SocialsData = {
  twitter: string;
  facebook: string;
  instagram: string;
};

interface EduAndEmpType extends EducationAndEmployment {
  officeEmail: string;
}

interface PersonalData extends PersonalInformation {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

type OtherData = Record<string, any>;

type IAPropsBase = {
  title: string;
};

type IAProps = IAPropsBase &
  (
    | { type: "social"; data: SocialsData }
    | { type: "educationAndEmployment"; data: EduAndEmpType }
    | { type: "guarantor"; data: Guarantor }
    | { type: "personal"; data: PersonalData }
    | { type: "other"; data: OtherData }
  );

const UserProfileData = ({ title, data, type }: IAProps) => {
  return (
    <article className="user-profile-data">
      <h4 className="user-profile-data--heading">{title}</h4>
      {type === "social" && <Socials data={data} />}
      {type === "educationAndEmployment" && <EduAndEmp data={data} />}
      {type === "guarantor" && <Guarantors data={data} />}
      {type === "personal" && <Personal data={data} />}
    </article>
  );
};

const Socials = ({ data }: { data: SocialsData }) => {
  return (
    <div className="user-profile-data__content">
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Twitter</p>
        <p className="user-profile-data__value">{data?.twitter}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Facebook</p>
        <p className="user-profile-data__value">{data?.facebook}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Instagram</p>
        <p className="user-profile-data__value">{data?.instagram}</p>
      </div>
    </div>
  );
};
const EduAndEmp = ({ data }: { data: EduAndEmpType }) => {
  return (
    <div className="user-profile-data__content">
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">level of education</p>
        <p className="user-profile-data__value">{data?.levelOfEducation}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">employment status</p>
        <p className="user-profile-data__value">{data?.employmentStatus}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">sector of employment</p>
        <p className="user-profile-data__value">{data?.sectorOfEmployment}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Duration of employment</p>
        <p className="user-profile-data__value">
          {data?.durationOfEmployment} year
          {data?.durationOfEmployment > 1 && "s"}
        </p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">office email</p>
        <p className="user-profile-data__value">{data?.officeEmail}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Monthly income</p>
        <p className="user-profile-data__value">
          &#x20A6;
          {formatter({}).format(parseInt(data?.monthlyIncome.split("-")[0]))} -
          &#x20A6;
          {formatter({}).format(parseInt(data?.monthlyIncome.split("-")[1]))}
        </p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">loan repayment</p>
        <p className="user-profile-data__value">
          {formatter({ decimal: 0 }).format(data?.loanRepayment)}
        </p>
      </div>
    </div>
  );
};
const Guarantors = ({ data }: { data: Guarantor }) => {
  return (
    <div className="user-profile-data__content">
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">full Name</p>
        <p className="user-profile-data__value">
          {data?.firstName} {data?.lastName}
        </p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Phone Number</p>
        <p className="user-profile-data__value">{data?.phoneNumber}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Email Address</p>
        <p className="user-profile-data__value">{data?.email}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Relationship</p>
        <p className="user-profile-data__value">{data?.relationship}</p>
      </div>
    </div>
  );
};
const Personal = ({ data }: { data: PersonalData }) => {
  return (
    <div className="user-profile-data__content">
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">full Name</p>
        <p className="user-profile-data__value">
          {" "}
          {data?.firstName} {data?.lastName}
        </p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Phone Number</p>
        <p className="user-profile-data__value">{data?.phone}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Email Address</p>
        <p className="user-profile-data__value">{data?.email}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">BVN</p>
        <p className="user-profile-data__value">{data?.bvn}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Gender</p>
        <p className="user-profile-data__value">{data?.gender}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Marital Status</p>
        <p className="user-profile-data__value">{data?.maritalStatus}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Children</p>
        <p className="user-profile-data__value">{data?.children}</p>
      </div>
      <div className="user-profile-data__item">
        <p className="user-profile-data__label">Type of Residence</p>
        <p className="user-profile-data__value">{data?.residenceType}</p>
      </div>
    </div>
  );
};

export default UserProfileData;
