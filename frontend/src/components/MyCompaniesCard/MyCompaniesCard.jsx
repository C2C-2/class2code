import "./MyCompaniesCard.css";
import { Button } from "@mantine/core";
import { FaStar, FaTrash } from "react-icons/fa";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
export default function MyCompaniesCard({
  CompanyName,
  CompanyDescription,
  Rate,
  Company_id,
  refetchCompanies,
}) {
  const DELETE_COMPANY = gql`
    query Query($companyId: Int!) {
      deleteCompany(companyId: $companyId)
    }
  `;

  const [deleteCompany, { loading, error, data }] = useLazyQuery(
    DELETE_COMPANY,
    {
      onCompleted: () => {
        refetchCompanies();
      },
    }
  );

  return (
    <Link
      to={`/EditMyCompanyProfile/${Company_id}`}
      className="MyCompaniesCard shadow"
      key={Company_id}
    >
      <h4>{CompanyName}</h4>
      <p>{CompanyDescription}</p>
      <h2>
        {Rate} <FaStar color="yellow" size={20} />
      </h2>
      <hr />
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (!window.confirm("Are you sure you want to delete this company?"))
            return;

          deleteCompany({ variables: { companyId: parseInt(Company_id) } });
        }}
        variant="light"
        color="red"
        radius="xl"
      >
        <FaTrash />
      </Button>
    </Link>
  );
}
