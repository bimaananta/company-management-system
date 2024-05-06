export default function Input({ name, type, handleChange, value }) {
  let newName = name.split("_").length > 1 ? name.split("_") : name;
  return (
    <div className="mb-3">
      <label htmlFor={name.toLowerCase()} className="form-label fw-bold">
        {name.split("_").length > 1 ? `${newName[0]} ${newName[1]}` : `${name}`}
      </label>
      <input
        type={type}
        name={name.toLowerCase()}
        id={name.toLowerCase()}
        className="form-control"
        onChange={handleChange}
        value={value}
        placeholder={
          name.split("_").length > 1
            ? `Enter ${newName[0]} ${newName[1]}`
            : `Enter ${name}`
        }
      />
    </div>
  );
}
