import { BsFillSpeakerFill } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";

export default function VendorPageCard({
  vendor,
  handleVendorDetail,
  onClick,
}) {
  return (
    <div
      key={vendor.id}
      onClick={onClick}
      className="px-12 py-8 bg-[rgb(0,242,121)] text-white rounded-[40px] shadow-xl cursor-pointer text-left flex flex-col justify-between transition hover:scale-105"
    >
      <div>
        <h1 className="text-4xl font-bold mb-4">{vendor.name}</h1>
      </div>
      <div className="flex max-w-full justify-between">
        <div>
          <p className="text-xl">{vendor.mainCategory}</p>
          <p className="text-xl">
            {vendor.district}, {vendor.province}
          </p>
          <Badge
            className={
              vendor.status === "ACTIVE"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }
          >
            {vendor?.status}
          </Badge>
        </div>
        <div className="h-fit w-fit bg-white rounded-full flex justify-self-end self-end">
          <BsFillSpeakerFill className="text-6xl text-black" />
        </div>
      </div>
    </div>
  );
}
