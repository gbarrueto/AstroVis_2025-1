import '../styles/modalInfoStyle.css';

export default function ModalInfo({ setDisplayModal }) {
  function hideModal() {
    setDisplayModal(false);
  }
  
  return (
    <div className="modalInfoOverlay" onClick={hideModal}>
      <div className="modalInfoWrapper">
        <h1>QUE PASAAAAAAAA QUE ANDAI SAPEANDO OEEEEEE SALE DE AQUI ANDA A VER LOS PUNTITOS ESOS</h1>
      </div>
    </div>
  )
}