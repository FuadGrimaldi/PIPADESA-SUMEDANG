"use client";

import { useState } from "react";
import { Desa } from "@/types/desa"; // Adjust path as needed
import { MapPin, Phone, Mail, Twitter, Instagram, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";

interface ProfileDesaProps {
  desa: Desa;
}

export default function ProfileDesaComponent({ desa }: ProfileDesaProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nama_desa: desa.nama_desa,
    alamat: desa.alamat,
    telepon: desa.telepon,
    email: desa.email,
    twitter: desa.twitter,
    instagram: desa.instagram,
    visi: desa.visi,
    misi: desa.misi,
    tujuan: desa.tujuan,
    sejarah: desa.sejarah,
    gmaps_embed_url: desa.gmaps_embed_url,
    lat: desa.lat?.toString() || "",
    lng: desa.lng?.toString() || "",
  });

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use FormData for file upload
      const submitData = new FormData();

      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          submitData.append(key, value);
        }
      });

      // Add coordinate fields with proper conversion
      if (formData.lat) {
        submitData.append("lat", formData.lat);
      }
      if (formData.lng) {
        submitData.append("lng", formData.lng);
      }

      // Add file if selected
      if (selectedFile) {
        submitData.append("foto_depan", selectedFile);
      }

      const res = await fetch(`/api/desa/${desa.id}`, {
        method: "PUT",
        body: submitData, // Don't set Content-Type, let browser set it for FormData
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Gagal update");
      }

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Update Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditing(false);

      // Clean up preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setSelectedFile(null);

      router.refresh(); // Refresh to show updated data
    } catch (error) {
      console.error("Error updating desa:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Update Gagal",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nama_desa: desa.nama_desa,
      alamat: desa.alamat,
      telepon: desa.telepon,
      email: desa.email,
      twitter: desa.twitter,
      instagram: desa.instagram,
      visi: desa.visi,
      misi: desa.misi,
      tujuan: desa.tujuan,
      sejarah: desa.sejarah,
      gmaps_embed_url: desa.gmaps_embed_url,
      lat: desa.lat?.toString() || "",
      lng: desa.lng?.toString() || "",
    });

    // Clean up file selection
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Profile Desa</h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Desa
              </label>
              <input
                type="text"
                name="nama_desa"
                value={formData.nama_desa}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto Depan
              </label>
              <input
                type="file"
                name="foto_depan"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Preview current or selected image */}
              <div className="mt-2">
                {previewUrl ? (
                  <div className="relative">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={200}
                      height={150}
                      className="object-cover rounded border"
                    />
                    <span className="text-xs text-green-600 block mt-1">
                      Gambar baru (belum disimpan)
                    </span>
                  </div>
                ) : desa.foto_depan ? (
                  <div className="relative">
                    <Image
                      src={desa.foto_depan}
                      alt="Current"
                      width={200}
                      height={150}
                      className="object-cover rounded border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/default-village.jpg";
                      }}
                    />
                    <span className="text-xs text-gray-600 block mt-1">
                      Gambar saat ini
                    </span>
                  </div>
                ) : (
                  <div className="w-200 h-150 bg-gray-100 rounded border flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      Tidak ada gambar
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telepon
              </label>
              <input
                type="tel"
                name="telepon"
                value={formData.telepon}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps Embed URL
              </label>
              <input
                type="url"
                name="gmaps_embed_url"
                value={formData.gmaps_embed_url}
                onChange={handleInputChange}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="lat"
                value={formData.lat}
                onChange={handleInputChange}
                placeholder="-6.2088"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="lng"
                value={formData.lng}
                onChange={handleInputChange}
                placeholder="106.8456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visi
            </label>
            <textarea
              name="visi"
              value={formData.visi}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Misi
            </label>
            <textarea
              name="misi"
              value={formData.misi}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tujuan
            </label>
            <textarea
              name="tujuan"
              value={formData.tujuan}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sejarah
            </label>
            <textarea
              name="sejarah"
              value={formData.sejarah}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-lg shadow-md">
        <h2 className="lg:text-2xl text-lg font-bold text-white">
          Profil Desa
        </h2>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Grid utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Foto Desa */}
        {desa.foto_depan && (
          <div className="bg-white rounded-lg shadow-md p-5 md:col-span-2">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Foto Desa
            </h3>
            <div className="relative w-full h-64">
              <Image
                src={desa.foto_depan}
                alt={`Foto ${desa.nama_desa}`}
                fill
                className="object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/default-village.jpg";
                }}
              />
            </div>
          </div>
        )}

        {/* Informasi Dasar */}
        <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            Informasi Dasar
          </h3>
          <div className="space-y-3">
            <p>
              <span className="font-medium">Nama Desa:</span> {desa.nama_desa}
            </p>
            <p>
              <MapPin className="inline w-4 h-4 mr-1 text-gray-500" />{" "}
              {desa.alamat}
            </p>
            <p>
              <Phone className="inline w-4 h-4 mr-1 text-gray-500" />{" "}
              {desa.telepon}
            </p>
            <p>
              <Mail className="inline w-4 h-4 mr-1 text-gray-500" />{" "}
              {desa.email}
            </p>
          </div>
        </div>

        {/* Media Sosial */}
        <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Media Sosial</h3>
          <div className="space-y-3">
            <p>
              <Twitter className="inline w-4 h-4 mr-1 text-blue-500" />
              {desa.twitter ? (
                <a
                  href={desa.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {desa.twitter}
                </a>
              ) : (
                "-"
              )}
            </p>
            <p>
              <Instagram className="inline w-4 h-4 mr-1 text-pink-500" />
              {desa.instagram ? (
                <a
                  href={desa.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline"
                >
                  {desa.instagram}
                </a>
              ) : (
                "-"
              )}
            </p>
          </div>
        </div>

        {/* Koordinat Lokasi */}
        <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Koordinat</h3>
          <p>
            <span className="font-medium">Latitude:</span>{" "}
            {desa.lat?.toString() || "-"}
          </p>
          <p>
            <span className="font-medium">Longitude:</span>{" "}
            {desa.lng?.toString() || "-"}
          </p>
        </div>

        {/* Visi, Misi, Tujuan */}
        <div className="bg-white rounded-lg shadow-md p-5 space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Visi</h3>
          <p className="whitespace-pre-wrap">{desa.visi}</p>

          <h3 className="text-lg font-semibold border-b pb-2">Misi</h3>
          <p className="whitespace-pre-wrap">{desa.misi}</p>

          <h3 className="text-lg font-semibold border-b pb-2">Tujuan</h3>
          <p className="whitespace-pre-wrap">{desa.tujuan}</p>
        </div>
      </div>

      {/* Sejarah Desa */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h3 className="text-lg font-semibold border-b pb-2">Sejarah Desa</h3>
        <p className="whitespace-pre-wrap">{desa.sejarah}</p>
      </div>

      {/* Peta Lokasi */}
      {desa.gmaps_embed_url && (
        <div className="bg-white rounded-lg shadow-md p-5">
          <h3 className="text-lg font-semibold border-b pb-2">Peta Lokasi</h3>
          <div className="aspect-video rounded-lg overflow-hidden mt-3">
            <iframe
              src={desa.gmaps_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-gray-50 rounded-lg shadow-inner p-4 text-sm text-gray-600 flex items-center justify-between">
        <span>
          <Clock className="inline w-4 h-4 mr-1" /> Dibuat:{" "}
          {new Date(desa.created_at).toLocaleString("id-ID")}
        </span>
        <span>
          Diperbarui: {new Date(desa.updated_at).toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
}
