// import React, { useRef, useState } from "react";
// import MainButton from "@/components/button";

// const DragDrop = () => {
//   const [files, setFiles] = useState<[]>([]);

//     const handleFiles = (e:React.ChangeEvent<HTMLInputElement>) => {
//         let fileList = e.target.files;
//         setFiles((prevFiles) => [...prevFiles])
//         console.log(fileList)
//   };

//   const handleSubmit = () => {};
//   const inputRef = useRef<HTMLInputElement>(null);
//   return (
//     <div className="mt-[100px]">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           name="file"
//           ref={inputRef}
//           onChange={handleFiles}
//           className="hidden"
//           multiple
//         />
//       </form>
//       <MainButton
//         buttonName="Add images"
//         onClick={() => inputRef.current?.click()}
//         className={"border border-black"}
//         width={"124px"}
//         height={"50px"}
//       />
//     </div>
//   );
// };
// export default DragDrop;

import { useRef, useState } from "react";
import MainButton from "@/components/button";

const DragDrop = () => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      // for (let i = 0; i < filesArray.length; i++) {
      //     console.log(filesArray[i].name)
      // }
      setFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  return (
    <div className="mt-[100px]">
      <form>
        <input
          type="file"
          name="file"
          ref={inputRef}
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
      </form>
      <MainButton
        buttonName="Add images"
        onClick={() => inputRef.current?.click()}
        className="border border-black"
        width="124px"
        height="50px"
      />
      <div>
        <h2>Uploaded Files:</h2>
        {/* <ul> */}
        <div className="">
          {files.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
        {/* </ul> */}
      </div>
    </div>
  );
};

export default DragDrop;
