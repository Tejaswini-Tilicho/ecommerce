// import React from "react";
// import Modal from "react-modal";
// import NextImage from "next/image";

// interface SampleModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   image: string;
// }

// const SampleModal: React.FC<SampleModalProps> = ({
//   isOpen,
//   onRequestClose,
//   image,
// }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Image Modal"
//       style={{
//         overlay: {
//           backgroundColor: "rgba(0, 0, 0, 0.75)",
//         },
//         content: {
//           color: "lightsteelblue",
//           top: "50%",
//           left: "50%",
//           right: "auto",
//           bottom: "auto",
//           marginRight: "-50%",
//           transform: "translate(-50%, -50%)",
//         },
//       }}
//     >
//       {/* <h2>Image Preview</h2> */}
//       <NextImage
//         className="relative"
//         src={image}
//         alt="Preview"
//         // style={{ width: "100%", height: "auto" }}
//         width={400}
//         height={400}
//       />
//       <button
//         className="bg-[#000000] w-[30px] h-[30px] rounded-full text-[#FFFFFF] absolute top-[20px] right-10"
//         onClick={onRequestClose}
//       >
//         X
//       </button>
//     </Modal>
//   );
// };

// export default SampleModal;

import React from "react";
import { Modal } from "antd";
import NextImage from "next/image";

interface SampleModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: string;
}

const SampleModal: React.FC<SampleModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  return (
    <Modal
      //   title="Image Preview"
      open={isOpen}
      onOk={onRequestClose}
      onCancel={onRequestClose}
      //   zIndex={2000}
      //   footer={[
      //     <Button key="close" onClick={onRequestClose}>
      //       Close
      //     </Button>,
      //   ]}
      footer={null}
    >
      <NextImage
        className="relative"
        src={image}
        alt="Preview"
        width={400}
        height={400}
        style={{ width: "100%", height: "auto" }}
      />
    </Modal>
  );
};

export default SampleModal;
