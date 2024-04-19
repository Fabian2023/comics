import ReactModal from 'react-modal';
import DetailCharacters from '../Detailcharacters/DetailCharacters';

// eslint-disable-next-line react/prop-types
const CharacterModal = ({ isOpen, onClose, character }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div>
          <DetailCharacters characterId={character} />
        </div>
      </div>
    </ReactModal>
  );
};

export default CharacterModal;
