import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'

const Table = ({ onRowClick }) => {
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [err, setErr] = useState("NO DATA FOUND")
    useEffect(() => {
        // I haven't use getserversideprops or getstaticprops because in new version of next these are deprecated
        const fetchData = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/products')
                const data = res.data;
                setTableData(data);
                setFilteredData(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    console.log(tableData)
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        console.log(query)
        const filtered = tableData.filter(item =>
            item.category.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };
    console.log(filteredData)

    const handleSort = (column) => {
        let direction = 'asc';

        if (sortColumn === column && sortDirection === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...filteredData].sort((a, b) => {
            if (a[column] < b[column]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setFilteredData(sortedData);
        setSortDirection(direction);
        setSortColumn(column);
    };

    const handleFilter = (filterValue) => {
        setFilterValue(filterValue);

        const filtered = tableData.filter(item =>
            item.category === filterValue
        );

        setFilteredData(filtered);
    };
    const handleRowClick = (item) => {
        onRowClick(item.image);
    };

    return (
        <>
            <div className='table-container'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"

                />
                <select value={filterValue} className="search-input" onChange={(e) => handleFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="men&apos;s clothing">Men's clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                    <option value="women&apos;s clothing">Women's clothing</option>
                </select>
            </div>
            <div className='table-container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th className="point" onClick={() => handleSort('price')}>Price{sortColumn === 'price' && (
                                sortDirection === 'asc' ? '▲' : '▼'
                            )}</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Product Image</th>
                            <th >Rating</th>
                        </tr>
                    </thead>

                      
                    <tbody>
                            {filteredData.map((item) => {
                                return (<tr key={item.id} onClick={() => handleRowClick(item)}>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <td><Image src={item.image}
                                        width={100}
                                        height={100}
                                        alt={item.title}
                                    ></Image></td>
                                    <td>{item.rating.rate}</td>
                                </tr>)
                            })}
                            

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;

