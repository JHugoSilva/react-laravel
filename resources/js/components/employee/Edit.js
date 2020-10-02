import React, { useEffect, useState } from 'react';
import employee from '../../services/Employee';

import employeeService from '../../services/Employee'

function Edit(props) {

    const [id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [city, setCity] = useState(null)
    const [address, setAddress] = useState(null)
    const [phone, setPhone] = useState(null)
    const [rol, setRol] = useState(null)
    const [selectedRol, setSelectRol] = useState(null);
    const [listRol, setLisRol] = useState([])

    useEffect(() => {

        async function fetchDataEmployee() {
            let id = props.match.params.id;
            const res = await employeeService.get(id)

            if (res.success) {
                const data = res.data
                setId(data.id)
                setName(data.name_lastname)
                setEmail(data.email)
                setCity(data.city)
                setAddress(data.direction)
                setPhone(data.phone)
                setRol(data.rol)
                /*setSelectRol(data.role.rol_name)*/
            } else {
                alert(res.message)
            }
        }

        fetchDataEmployee()

        async function fetchDataRol() {
            const res = await employeeService.listRol()
            setLisRol(res.data)
        }

        fetchDataRol()

    }, [])

    const updateEmployee = async () => {
        const data = {
            id, name, email, city, address, phone, rol
        }

        const res = await employeeService.update(data)

        if (res.success) {
            alert(res.message)
        } else {
            alert(res.message)
        }
    }

    return (
        <div>
            <h4>Edit</h4>
            <hr />
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="firstName">Name employee</label>
                    <input type="text" class="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="phone">City {city} </label>
                    <select id="inputState" class="form-control" onChange={(event) => setCity(event.target.value)} value={city}>
                        <option selected>Choose...</option>
                        <option value="New York">New York</option>
                        <option value="Lodon">Lodon</option>
                        <option value="Madrid">Madrid</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" value={address} onChange={(event) => setAddress(event.target.value)} />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="address">Phone </label>
                    <input type="text" class="form-control" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="phone">Rol</label>
                    <select id="inputState" class="form-control" onChange={(event) => setRol(event.target.value)} value={rol}>
                        <option selected>Choose...</option>
                        {
                            listRol.map((itemSelect) => {
                                return (
                                    <option value={itemSelect.rol_id}>{itemSelect.rol_name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <button
                        onClick={() => updateEmployee()}
                        class="btn btn-primary btn-block" type="submit">Save</button>
                </div>
            </div>
        </div>
    )

}

export default Edit;
