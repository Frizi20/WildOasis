import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
    return (
        <>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </>
    );
}

// export default function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     function handleCloseModal(){
//         setIsOpenModal(false)
//     }

//     return (
//         <div>
//             <Button
//                 onClick={() => {
//                     setIsOpenModal((prev) => !prev);
//                 }}
//             >
//                 Add new cabin
//             </Button>
//             {isOpenModal && (
//                 <Modal onCloseModal={setIsOpenModal}>
//                     <CreateCabinForm handleCloseModal={handleCloseModal} />
//                 </Modal>
//             )}
//         </div>
//     );
// }
