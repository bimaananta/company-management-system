export default function Select({name, data, handleChange, idKey, column, value}){
    let newName = (name.split("_").length > 1) ? name.split("_") : name;

    return (
        <div className="mb-3">
            <label htmlFor={name.toLowerCase()} className="form-label fw-bold">{(name.split("_").length > 1) ? `${newName[0]}` : name}</label>
            <select name={name.toLowerCase()} id={name.toLowerCase()} className="form-select" onChange={handleChange} value={value}>
                <option value={""}>{(name.split("_").length > 1) ? `Select ${newName[0]}` : `Select ${name}`}</option>
                {data?.map((item, index) => (
                    <option value={item[idKey]} key={index}>{item[column]}</option>
                ))} 
            </select>
        </div>
    )
}