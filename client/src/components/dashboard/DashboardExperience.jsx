import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//actions
import { deleteExperience } from '../../actions/profile';

const DashboardExperience = ({ experience, deleteExperience }) => {
  // inside the tables
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Duration</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

DashboardExperience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(DashboardExperience);
