import  { useState } from "react";
const App = () => {
  const [records, setRecords] = useState([]);

  
  const addRecord = async () => {
    try {
      const randomId = Math.floor(Math.random() * 83) + 1; 
      const response = await fetch(`https://swapi.dev/api/people/${randomId}/`, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const newRecord = {
        id: randomId,
        name: data.name,
      };
      setRecords([...records, newRecord]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <button onClick={addRecord} style={{ marginBottom: "10px", padding: "10px" }}>
        Add Record
      </button>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>
                <button onClick={() => deleteRecord(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
