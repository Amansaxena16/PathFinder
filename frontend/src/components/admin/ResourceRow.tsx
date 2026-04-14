export default function ResourceRow({ resource, onDelete }: any) {

    return (
  
      <tr
        style={{
          borderTop: "1px solid #C2CCDE"
        }}
      >
  
        <td style={td}>{resource.title}</td>
  
        <td style={td}>{resource.category}</td>
  
        <td style={td}>{resource.resource_type}</td>
  
  
        <td style={td}>
  
          <button
            style={editBtn}
          >
            Edit
          </button>
  
  
          <button
            onClick={() => onDelete(resource.id)}
            style={deleteBtn}
          >
            Delete
          </button>
  
        </td>
  
      </tr>
  
    );
  
  }
  
  
  
  const td = {
  
    padding: "12px 8px",
  
    color: "#2C2C3E"
  
  };
  
  
  const editBtn = {
  
    background: "#1FC8C8",
  
    border: "none",
  
    padding: "6px 12px",
  
    borderRadius: "6px",
  
    marginRight: "8px",
  
    cursor: "pointer",
  
    color: "white"
  
  };
  
  
  const deleteBtn = {
  
    background: "#A8D420",
  
    border: "none",
  
    padding: "6px 12px",
  
    borderRadius: "6px",
  
    cursor: "pointer",
  
    color: "#1A1A2E"
  
  };