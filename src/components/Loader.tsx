
interface LoadProps {
    className?: string;
}

const Loader:React.FC<LoadProps> = (className) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #000000;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;

// import Image from "next/image";
// import loader from "../../public/images/loader.svg";
//  const Loader: React.FC<LoadProps> = (className) => {
//    return (
//      <div className="mt-[100px]">
//        <Image src={loader} alt="loading" />;
//      </div>
//    );
//  };

// export default Loader;

