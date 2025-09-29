"use client";
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Instagram,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import { Desa } from "@/types/desa";
import Swal from "sweetalert2";

const MainKontak = ({ desa }: { desa: Desa | null }) => {
  // Sample data - replace with actual data from your backend

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    subjek: "",
    pesan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Pesan Anda telah terkirim!",
        showConfirmButton: false,
        timer: 2000,
      });

      setFormData({
        nama: "",
        email: "",
        telepon: "",
        subjek: "",
        pesan: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-6 border-b-4 border-[#C0B099] pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Hubungi Kami
        </h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-600">
            Kami siap membantu dan mendengarkan aspirasi Anda. Jangan ragu untuk
            menghubungi kami melalui berbagai cara berikut.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-800">
              Telepon
            </h3>
          </div>
          <p className="text-gray-600">
            {desa?.telepon || "loading..mencari kontak"}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 p-3 rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-800">Email</h3>
          </div>
          <p className="text-gray-600">
            {desa?.email || "loading..mencari kontak"}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-800">Alamat</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {desa?.alamat || "loading..mencari kontak"}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Social Media & Hours */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Ikuti Media Sosial Kami
          </h3>

          <div className="space-y-3 mb-6">
            <a
              href={`https://twitter.com/${desa?.twitter.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <Twitter className="w-6 h-6 text-blue-500 mr-3" />
              <span className="text-gray-700 group-hover:text-blue-600">
                {desa?.twitter || "loading..mencari kontak"}
              </span>
            </a>

            <a
              href={`https://instagram.com/${desa?.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <Instagram className="w-6 h-6 text-blue-500 mr-3" />
              <span className="text-gray-700 group-hover:text-blue-600">
                {desa?.instagram || "loading..mencari kontak"}
              </span>
            </a>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Jam Pelayanan</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Senin - Jumat</span>
                <span className="font-medium text-gray-800">08:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sabtu</span>
                <span className="font-medium text-gray-800">08:00 - 12:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minggu</span>
                <span className="font-medium text-red-500">Tutup</span>
              </div>
            </div>
          </div>
        </div>
        {/* Map and Social Media */}
        <div className="space-y-6">
          {/* Map */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#C0B099] to-[#ECE1D1] p-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Lokasi Kantor Desa
              </h3>
            </div>
            <div className="p-6">
              <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
                <iframe
                  src={desa?.gmaps_embed_url || "loading..mencari lokasi"}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kantor Desa"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {desa?.nama_desa || "loading..mencari kontak"}
                </h4>
                <p className="text-gray-600 text-sm">
                  {desa?.alamat || "loading..mencari kontak"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainKontak;
