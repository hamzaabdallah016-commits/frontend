import { Table, Button } from "react-bootstrap";
import { EditIcon, DeleteIcon } from "../../../../assets/icons/Icons.jsx";
import { truncateText } from "../../../../assets/utils/helpers.js";

const PersonTable = ({ persons, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Delivery Address</th>
          <th>Favorite Foods</th>
          <th>Image</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {persons && persons.length > 0 ? (
          persons.map((person) => (
            <tr key={person._id}>
              <td>{truncateText(person.name, 20)}</td>
              <td>{truncateText(person.age, 25)}</td>
              <td>{truncateText(person.email, 25)}</td>
              <td>{truncateText(person.phone, 25)}</td>
              <td>{truncateText(person.deliveryAddress, 25)}</td>
              <td>{truncateText(person.favoriteFoods.join(", "), 25)}</td>
              <td>
                {person.image ? (
                  <img
                    src={person.image}
                    alt={person.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{person.role === "ADMIN" ? "Admin" : "Client"}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => onEdit( person)}
                  className="me-2"
                >
                  <EditIcon />
                </Button>

                <Button variant="danger" onClick={() => onDelete(person._id)}>
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9" className="text-center">
              No persons found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default PersonTable;