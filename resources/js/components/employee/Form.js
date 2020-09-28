import React, { useEffect, useState } from 'react';

import employeeService from '../../services/Employee'

function Form() {

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [city, setCity] = useState(null)
    const [address, setAddress] = useState(null)
    const [phone, setPhone] = useState(null)
    const [rol, setRol] = useState(null)


    const [listRol, setListRol] = useState([])
    useEffect(() => {
        async function fetchDataRol() {
            const res = await employeeService.listRol()
            setListRol(res.data)
        }
        fetchDataRol()
    }, [])

    const saveEmployee = async () => {

        const data = {
            name, email, city, address, phone, rol
        }

        const res = await employeeService.save(data)

        if (res.success) {
            alert(res.message)
        } else {
            alert(res.message)
        }
    }
    return (
        <div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="firstName">Name employee</label>
                    <input type="text" class="form-control" placeholder="Name"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" placeholder="you@example.com"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="phone">City {city} </label>
                    <select id="inputState" class="form-control" onChange={(event) => setCity(event.target.value)}>
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
                    <input type="text" class="form-control" placeholder="1234 Main St"
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="phone">Phone </label>
                    <input type="text" class="form-control" placeholder="123467890"
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="phone">Rol {rol} </label>
                    <select id="inputState" class="form-control" onChange={(event) => setRol(event.target.value)}>
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
                    <button class="btn btn-primary btn-block" type="submit" onClick={() => saveEmployee()}>Saves</button>
                </div>
            </div>
        </div >
    )
}

export default Form;