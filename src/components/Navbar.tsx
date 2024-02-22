"use client";

import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Indicators", href: "/indicators" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Disclosure>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Image
                src="/logo.svg"
                alt="Reonic Coding Challenge"
                height={32}
                width={32}
              />
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
