"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  FolderOpen,
  GraduationCap,
  User,
  Settings,
  BarChart3,
  FileText,
  Users,
  Award,
  BookOpen,
  School,
  UserCheck,
  Shield,
  HelpCircle,
  LogOut,
  Newspaper,
  MessageCircle,
  Landmark,
  UserRoundCog,
  Building,
  MessageCircleDashedIcon,
  ChartBarIncreasing,
  PenOffIcon,
  BarChart,
  Image,
  Video,
  Dessert,
  LucideNewspaper,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSidebar } from "@/context/SidebarContext"; // 🔥 context

// Fungsi logout
const logout = async () => {
  await signOut({ redirect: false });
};

const AdminKabSidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebar(); // 🔥 sidebar global
  const [activeItem, setActiveItem] = useState("dashboard");
  const [expandedItems, setExpandedItems] = useState<string[]>([]); // 🔥 submenu expand
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      id: "desa",
      label: "Desa",
      icon: Building,
      subItems: [
        {
          id: "profile-desa",
          label: "Profile Desa",
          icon: PenOffIcon,
          path: "/dashboard/desa",
        },
        {
          id: "perangkat-desa",
          label: "Perangkat Desa",
          icon: PenOffIcon,
          path: "/admindesa/struktur",
        },
      ],
    },
    {
      id: "user",
      label: "Users",
      icon: Users,
      subItems: [
        {
          id: "profile",
          label: "Profile",
          icon: User,
          path: "/dashboard/profile",
        },
        {
          id: "admin-desa",
          label: "Admin Desa",
          icon: UserCheck,
          path: "/dashboard/administrator-desa",
        },
      ],
    },
    {
      id: "publikasi",
      label: "Publikasi",
      icon: Newspaper,
      subItems: [
        {
          id: "berita",
          label: "Berita",
          icon: FileText,
          path: "/admindesa/berita",
        },
        {
          id: "agenda",
          label: "Agenda",
          icon: FolderOpen,
          path: "/admindesa/agenda",
        },
        {
          id: "video",
          label: "Video",
          icon: Video,
          path: "/admindesa/video",
        },
        {
          id: "infografis",
          label: "Infografis",
          icon: Image,
          path: "/admindesa/infografis",
        },
      ],
    },
    {
      id: "direktori",
      label: "Direktori",
      icon: LucideNewspaper,
      subItems: [
        {
          id: "kategori",
          label: "Kategori",
          icon: BookOpen,
          path: "/admindesa/kategori",
        },
        {
          id: "organisasi",
          label: "Organisasi",
          icon: Landmark,
          path: "/admindesa/organisasi",
        },
        {
          id: "sarana",
          label: "Sarana",
          icon: School,
          path: "/admindesa/sarana",
        },
        {
          id: "wisata",
          label: "Wisata",
          icon: Award,
          path: "/admindesa/wisata",
        },
      ],
    },
    {
      id: "partisipasi-publik",
      label: "Partisipasi Publik",
      icon: MessageCircleDashedIcon,
      subItems: [
        {
          id: "komentar",
          label: "Komentar",
          icon: MessageCircle,
          path: "/admindesa/komentar",
        },
        {
          id: "aspirasi-pengaduan",
          label: "Aspirasi & Pengaduan",
          icon: UserCheck,
          path: "/admindesa/aspirasi-pengaduan",
        },
      ],
    },
    {
      id: "statistik",
      label: "Statistik",
      icon: BarChart3,
      subItems: [
        { id: "sdgs", label: "SDGs", icon: BarChart, path: "/admindesa/sdgs" },
      ],
    },
  ];

  const bottomItems = [
    { id: "help", label: "Help & Support", icon: HelpCircle },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  type MenuSubItem = {
    id: string;
    label: string;
    icon: React.ElementType;
    path?: string;
    badge?: string;
  };

  type MenuItemType = {
    id: string;
    label: string;
    icon: React.ElementType;
    path?: string;
    badge?: string;
    subItems?: MenuSubItem[];
  };

  const MenuItem = ({
    item,
    isSubItem = false,
  }: {
    item: MenuItemType | MenuSubItem;
    isSubItem?: boolean;
  }) => {
    const Icon = item.icon;
    const hasSubItems =
      "subItems" in item && item.subItems && item.subItems.length > 0;
    const isItemExpanded = expandedItems.includes(item.id); // submenu expand check
    const isActive = activeItem === item.id;

    return (
      <div className="w-full">
        <div
          onClick={() => {
            setActiveItem(item.id);
            if (hasSubItems) toggleExpanded(item.id);
          }}
          className={`
            flex items-center w-full px-3 py-2.5 rounded-lg cursor-pointer
            transition-all duration-200 ease-in-out group relative
            ${
              isActive
                ? "bg-blue-50 text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }
            ${isSubItem ? "ml-6 py-2" : ""}
          `}
        >
          <div className="flex items-center flex-1 min-w-0">
            <Link href={item.path || "#"} className="flex items-center w-full">
              <Icon
                size={isSubItem ? 16 : 18}
                className={`flex-shrink-0 transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <span
                className={`ml-3 font-medium text-sm transition-all duration-300 ease-in-out ${
                  isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                } overflow-hidden whitespace-nowrap`}
              >
                {item.label}
              </span>
            </Link>
          </div>

          {isExpanded && hasSubItems && (
            <ChevronRight
              size={16}
              className={`ml-auto transition-transform duration-200 text-gray-400 ${
                isItemExpanded ? "rotate-90" : "rotate-0"
              }`}
            />
          )}

          {/* Tooltip hanya muncul kalau sidebar collapsed */}
          {!isExpanded && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              {item.label}
            </div>
          )}
        </div>

        {/* Sub Items */}
        {isExpanded && hasSubItems && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isItemExpanded ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-1 space-y-1">
              {item.subItems?.map((subItem) => (
                <MenuItem key={subItem.id} item={subItem} isSubItem={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-[22px] border-b border-gray-200">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
          }`}
        >
          <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            Portal Desa
          </h1>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        {bottomItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
        <div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-60"
          >
            <LogOut size={18} />
            {isExpanded && (
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminKabSidebar;
