// import React, { useState } from 'react';
// import Modal from 'react-modal';

// const CandidateIdModal = ({ isOpen, onRequestClose, onSubmit }) => {
//   const [candidateId, setCandidateId] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(candidateId);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Enter Candidate ID"
//       ariaHideApp={false}
//     >
//       <h2>Enter Candidate ID</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Candidate ID:
//           <input
//             type="text"
//             value={candidateId}
//             onChange={(e) => setCandidateId(e.target.value)}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//     </Modal>
//   );
// };

// export default CandidateIdModal;
