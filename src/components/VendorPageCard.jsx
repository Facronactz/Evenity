import { BsFillSpeakerFill } from "react-icons/bs";

export default function VendorPageCard({ vendor, handleVendorDetail }) {
  return (
    <div
      key={vendor.id}
      onClick={() => {
        // e.preventDefault();
        handleVendorDetail(vendor);
      }}
      className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left"
    >
      <h1 className="text-5xl font-bold mb-4 w-1/2">{vendor.name}</h1>
      {/* kurang vendor category field */}
      <p className="text-xl">Sound engineer and utility</p>
      <p className="text-xl">
        {vendor.district}, {vendor.province}
      </p>
      <div className="h-fit w-fit bg-white rounded-full flex justify-self-end">
        <BsFillSpeakerFill className="text-6xl text-black" />
      </div>
    </div>
  );
}
