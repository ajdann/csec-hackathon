import { FC } from 'react';

import './Reading.css'; // Import your CSS file

const Readings: FC<{ readings: any[] }> = ({ readings }) => {
    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Created On</th>
                        <th>Target Names</th>
                        <th>HCT</th>
                        <th>MCV</th>
                        {/* Add more headers based on your database schema */}
                    </tr>
                </thead>
                <tbody>
                    {readings.map((reading) => (
                        <tr key={reading.id}>
                            <td>{reading.id}</td>
                            <td>{reading.createdOn}</td>
                            <td>{reading.target_names}</td>
                            <td>{reading.hct}</td>
                            <td>{reading.mcv}</td>
                            {/* Add more cells based on your database schema */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Readings;
