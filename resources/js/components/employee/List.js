import React, { useEffect, useState } from 'react';

import employeeServices from '../../services/Employee'

import { Link } from 'react-router-dom'

function List() {

    const [listEmployee, setListEmployee] = useState([])

    useEffect(() => {
        async function fetchDataEmployee() {
            const res = await employeeServices.listEmployee()
            setListEmployee(res.data)
        }

        fetchDataEmployee()
    }, [])
    return (
        <section>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">City</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listEmployee.map((item) => {
                            return (
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name_lastname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.city}</td>
                                    <td>{item.direction}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.rol.rol_name}</td>
                                    <td>
                                        <Link to={"/employee/edit/" + item.id} class="btn btn-light"> Edit </Link>
                                        <Link to={"/employee/edit"} class="btn btn-danger"> Delete </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </section>
    )
}

export default List;
