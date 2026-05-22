import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiWhatsapp,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Globe, Mail, Phone } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { OnboardingFormData } from "./OnboardingInterface";

type ChannelId = keyof Pick<
  OnboardingFormData,
  | "instagram"
  | "whatsapp"
  | "facebook"
  | "tiktok"
  | "twitter"
  | "website"
  | "supportEmail"
  | "supportPhone"
>;

const CHANNELS: { name: string; id: ChannelId; icon: React.ReactNode; placeholder: string }[] = [
  { name: "Instagram", id: "instagram", icon: <SiInstagram size={16} />, placeholder: "https://instagram.com/yourbusiness" },
  { name: "WhatsApp", id: "whatsapp", icon: <SiWhatsapp size={16} />, placeholder: "https://wa.me/234XXXXXXXXXX" },
  { name: "Facebook", id: "facebook", icon: <SiFacebook size={16} />, placeholder: "https://facebook.com/yourbusiness" },
  { name: "TikTok", id: "tiktok", icon: <SiTiktok size={16} />, placeholder: "https://tiktok.com/@yourbusiness" },
  { name: "X", id: "twitter", icon: <SiX size={14} />, placeholder: "https://x.com/yourbusiness" },
  { name: "Website", id: "website", icon: <Globe size={16} />, placeholder: "https://yourbusiness.com" },
  { name: "Email", id: "supportEmail", icon: <Mail size={16} />, placeholder: "hello@yourbusiness.com" },
  { name: "Phone", id: "supportPhone", icon: <Phone size={16} />, placeholder: "+234XXXXXXXXXX" },
];

interface SocialMediaFormProps {
  formData: OnboardingFormData;
  update: (patch: Partial<OnboardingFormData>) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ formData, update }) => {
  const [activeTab, setActiveTab] = useState(CHANNELS[0].id);

  return (
    <div className="w-full">
      <div className="w-full max-w-md flex flex-col gap-6 py-4">
        <header className="flex flex-col gap-1">
          <p className="text-[10px] font-black tracking-[0.2em] text-[#86868B] uppercase">
            Channels
          </p>
          <h2 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
            Link your presence
          </h2>
        </header>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as ChannelId)}
          className="w-full"
        >
          <TabsList className="bg-[#F5F5F7] p-1 rounded-full w-full flex justify-between h-12 mb-8 overflow-hidden">
            {CHANNELS.map((channel) => (
              <TabsTrigger
                key={channel.id}
                value={channel.id}
                className="flex-1 rounded-full transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-brand-primary text-[#86868B] hover:bg-white/50"
              >
                {channel.icon}
              </TabsTrigger>
            ))}
          </TabsList>

          {CHANNELS.map((channel) => (
            <TabsContent
              key={channel.id}
              value={channel.id}
              className="mt-0 outline-none"
            >
              <div className="relative group">
                <label className="absolute -top-6 left-0 text-[9px] font-bold uppercase tracking-widest text-brand-primary">
                  {channel.name}
                </label>
                <div className="flex items-center gap-2 border-b-2 border-[#F2F2F7] focus-within:border-brand-primary transition-colors pb-2">
                  <Input
                    type={channel.id === "supportEmail" ? "email" : channel.id === "supportPhone" ? "tel" : "url"}
                    placeholder={channel.placeholder}
                    value={formData[channel.id]}
                    onChange={(e) => update({ [channel.id]: e.target.value })}
                    className="border-none bg-transparent h-12 px-0 text-sm font-medium focus-visible:ring-0 placeholder:text-gray-300"
                  />
                  {/* Visual indicator when field has a value */}
                  {formData[channel.id] && (
                    <span className="text-[10px] font-bold text-brand-primary uppercase shrink-0">
                      ✓
                    </span>
                  )}
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
