// import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import {
//   SiFacebook, SiInstagram, SiTiktok, SiWhatsapp, SiX,
// } from "@icons-pack/react-simple-icons";
// import { Globe, Mail, Phone, Check } from "lucide-react";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

// const SocialMediaForm = () => {
//   const channels = [
//     { name: "Instagram", id: "instagram", icon: <SiInstagram size={16} />, color: "hover:text-pink-500" },
//     { name: "WhatsApp", id: "whatsapp", icon: <SiWhatsapp size={16} />, color: "hover:text-green-500" },
//     { name: "Facebook", id: "facebook", icon: <SiFacebook size={16} />, color: "hover:text-blue-600" },
//     { name: "TikTok", id: "tiktok", icon: <SiTiktok size={16} />, color: "hover:text-black" },
//     { name: "Website", id: "website", icon: <Globe size={16} />, color: "hover:text-gray-600" },
//     { name: "Email", id: "supportEmail", icon: <Mail size={16} />, color: "hover:text-red-500" },
//     { name: "Phone", id: "supportPhone", icon: <Phone size={16} />, color: "hover:text-orange-500" },
//     { name: "X", id: "X", icon: <SiX size={14} />, color: "hover:text-black" },
//   ];

//   return (
//     <div className="w-full max-w-md flex flex-col gap-6 py-4">
//       {/* Label with "Costly" Spacing */}
//       <header className="flex flex-col gap-1">
//         <p className="text-[10px] font-black tracking-[0.2em] text-[#86868B] uppercase">
//           Connectivity Channels
//         </p>
//         <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">Link your presence</h2>
//       </header>

//       <Tabs defaultValue="instagram" className="w-full">
//         {/* Modern TabsList: Floating icons with a brand-primary indicator */}
//         <TabsList className="bg-[#F5F5F7] p-1 rounded-full w-full flex justify-between h-12 mb-8 overflow-hidden">
//           {channels.map((channel) => (
//             <TabsTrigger
//               key={channel.id}
//               value={channel.id}
//               className={`
//                 flex-1 rounded-full transition-all duration-300
//                 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[rgb(var(--brand-primary))]
//                 text-[#86868B] hover:bg-white/50
//               `}
//             >
//               {channel.icon}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {channels.map((channel) => (
//           <TabsContent key={channel.id} value={channel.id} className="mt-0 outline-none">
//             <div className="relative group">
//               <label className="absolute -top-6 left-0 text-[9px] font-bold uppercase tracking-widest text-[rgb(var(--brand-primary))]">
//                 {channel.name} Account URL
//               </label>

//               <div className="flex items-center gap-2 border-b-2 border-[#F2F2F7] focus-within:border-[rgb(var(--brand-primary))] transition-colors pb-2">
//                 <Input
//                   type="text"
//                   placeholder={`Enter your ${channel.name.toLowerCase()} link`}
//                   className="border-none bg-transparent h-12 px-0 text-lg font-medium focus-visible:ring-0 placeholder:text-gray-300"
//                 />

//                 <Button
//                   size="sm"
//                   className="rounded-full bg-[#1D1D1F] hover:bg-black text-white px-6 h-9 font-bold text-[11px] uppercase tracking-wider"
//                 >
//                   Connect
//                 </Button>
//               </div>

//               <p className="mt-2 text-[11px] text-[#86868B] font-medium italic">
//                 Verified links appear on your public Price Radar.
//               </p>
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   );
// };

// export default SocialMediaForm;

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiWhatsapp,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Globe, Mail, Phone, Check } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SocialMediaForm = () => {
  const channels = [
    {
      name: "Instagram",
      id: "instagram",
      icon: <SiInstagram size={16} />,
      color: "hover:text-pink-500",
    },
    {
      name: "WhatsApp",
      id: "whatsapp",
      icon: <SiWhatsapp size={16} />,
      color: "hover:text-green-500",
    },
    {
      name: "Facebook",
      id: "facebook",
      icon: <SiFacebook size={16} />,
      color: "hover:text-blue-600",
    },
    {
      name: "TikTok",
      id: "tiktok",
      icon: <SiTiktok size={16} />,
      color: "hover:text-black",
    },
    { name: "X", id: "X", icon: <SiX size={14} />, color: "hover:text-black" },
    {
      name: "Website",
      id: "website",
      icon: <Globe size={16} />,
      color: "hover:text-gray-600",
    },

    {
      name: "Email",
      id: "supportEmail",
      icon: <Mail size={16} />,
      color: "hover:text-red-500",
    },
    {
      name: "Phone",
      id: "supportPhone",
      icon: <Phone size={16} />,
      color: "hover:text-orange-500",
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full max-w-md flex flex-col gap-6 py-4">
        {/* Label with "Costly" Spacing */}
        <header className="flex flex-col gap-1">
          <p className="text-[10px] font-black tracking-[0.2em] text-[#86868B] uppercase">
            Channels
          </p>
          <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
            Link your presence
          </h2>
        </header>

        <Tabs className="w-full">
          {/* Modern TabsList: Floating icons with a brand-primary indicator */}
          <TabsList className="bg-[#F5F5F7] p-1 rounded-full w-full flex justify-between h-12 mb-8 overflow-hidden">
            {channels.map((channel) => (
              <TabsTrigger
                key={channel.id}
                value={channel.id}
                className={`
                flex-1 rounded-full transition-all duration-300
                data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-brand-primary
                text-[#86868B] hover:bg-white/50
              `}
              >
                {channel.icon}
              </TabsTrigger>
            ))}
          </TabsList>

          {channels.map((channel) => (
            <TabsContent
              key={channel.id}
              value={channel.id}
              className="mt-0 outline-none"
            >
              <div className="relative group">
                <label className="absolute -top-6 left-0 text-[9px] font-bold uppercase tracking-widest text-brand-primary">
                  {channel.name}
                  {!["Website", "Email", "Phone"].includes(channel.name) &&
                    " Account URL"}
                </label>

                <div className="flex items-center gap-2 border-b-2 border-[#F2F2F7] focus-within:border-brand-primary transition-colors pb-2">
                  <Input
                    type="text"
                    placeholder={`Enter your ${channel.name.toLowerCase()}${!["Website", "Email", "Phone"].includes(channel.name) ? " link" : ""}`}
                    className="border-none bg-transparent h-12 px-0 text-lg font-medium focus-visible:ring-0 placeholder:text-gray-300"
                  />

                  <Button
                    size="sm"
                    className="rounded-full bg-[#1D1D1F] hover:bg-black text-white px-6 h-9 font-bold text-[11px] uppercase tracking-wider"
                  >
                    Connect
                  </Button>
                </div>

                <p className="mt-2 text-[11px] text-[#86868B] font-medium italic">
                  Customers will be able to reach you via this channel.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SocialMediaForm;
