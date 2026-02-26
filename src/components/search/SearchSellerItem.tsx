import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import { Button } from "../ui/button";
import { Globe, Mail, MapPin, MoreHorizontal, Phone } from "lucide-react";
import { Seller } from "@/data/sellers";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiWhatsapp,
  SiX,
} from "@icons-pack/react-simple-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface SearchSellerItemProps {
  seller: Seller;
  price: number;
}
const SearchSellerItem = ({ seller, price }: SearchSellerItemProps) => {
  return (
    <Item className="py-6 border-b border-neutral-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <ItemContent className="w-full sm:w-auto">
        <ItemTitle className="font-bold tracking-tight text-[17px] text-[#1D1D1F]">
          {seller.name}{" "}
          <span className="uppercase text-[#86868B] font-bold text-[10px] tracking-widest ml-1">
            • {seller.city}
          </span>
        </ItemTitle>
        <ItemDescription className="font-black text-xl text-[#1D1D1F] mt-0.5">
          ₦{price}{" "}
          <span className="font-medium text-[12px] text-[#86868B] tracking-normal">
            at this store
          </span>
        </ItemDescription>
      </ItemContent>

      <ItemActions className="flex flex-wrap sm:flex-nowrap gap-2 items-center justify-start sm:justify-end w-full sm:w-auto">
        {seller.category === "store" && seller.address && (
          <Button
            variant="default"
            className="rounded-full w-10 h-10 p-0 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] shadow-sm transition-transform active:scale-95 cursor-pointer"
            onClick={() => {
              const encodedAddress = encodeURIComponent(
                seller.address + seller.city + seller.state + seller.country,
              );
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
                "_blank",
              );
            }}
          >
            <MapPin size={18} strokeWidth={2.5} />
          </Button>
        )}
        {seller.channels.whatsapp && (
          <Button
            variant="secondary"
            className="rounded-full w-10 h-10 p-0 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] border-none cursor-pointer"
            onClick={() => window.open(seller.channels.whatsapp, "_blank")}
          >
            <SiWhatsapp size={18} />
          </Button>
        )}
        {seller.channels.instagram && (
          <Button
            variant="secondary"
            className="rounded-full w-10 h-10 p-0 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] border-none cursor-pointer"
            onClick={() => window.open(seller.channels.instagram, "_blank")}
          >
            <SiInstagram size={18} />
          </Button>
        )}
        {seller.channels.supportPhone && (
          <Button
            variant="default"
            className="rounded-full w-10 h-10 p-0 bg-[#1D1D1F] hover:bg-black text-white shadow-sm cursor-pointer"
            onClick={() =>
              window.open(`tel:${seller.channels.supportPhone}`, "_blank")
            }
          >
            <Phone size={18} />
          </Button>
        )}

        {/* OVERFLOW: Popover Menu */}
        {seller.channels.facebook ||
        seller.channels.instagram ||
        seller.channels.twitter ||
        seller.channels.tiktok ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full w-10 h-10 p-0 border-[#E8E8ED] bg-white cursor-pointer"
              >
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl p-2 shadow-2xl border-[#F2F2F7]"
            >
              {seller.channels.website && (
                <DropdownMenuItem
                  onClick={() => window.open(seller.channels.website, "_blank")}
                >
                  <Globe className="mr-2 h-4 w-4" /> Website
                </DropdownMenuItem>
              )}
              {seller.channels.facebook && (
                <DropdownMenuItem
                  onClick={() =>
                    window.open(seller.channels.facebook, "_blank")
                  }
                >
                  <SiFacebook className="mr-2 h-4 w-4" /> Facebook
                </DropdownMenuItem>
              )}
              {seller.channels.twitter && (
                <DropdownMenuItem
                  onClick={() => window.open(seller.channels.twitter, "_blank")}
                >
                  <SiX className="mr-2 h-4 w-4" /> X formerly Twitter
                </DropdownMenuItem>
              )}
              {seller.channels.supportEmail && (
                <DropdownMenuItem
                  onClick={() =>
                    window.open(seller.channels.supportEmail, "_blank")
                  }
                >
                  <Mail className="mr-2 h-4 w-4" /> Support Email
                </DropdownMenuItem>
              )}
              {seller.channels.tiktok && (
                <DropdownMenuItem
                  onClick={() => window.open(seller.channels.tiktok, "_blank")}
                >
                  <SiTiktok className="mr-2 h-4 w-4" /> TikTok
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </ItemActions>
    </Item>
  );
};
export default SearchSellerItem;
