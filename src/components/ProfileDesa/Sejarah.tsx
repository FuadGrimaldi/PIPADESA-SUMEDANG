"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface Props {
  subdomain: string; // Assuming this is passed as a prop
}

export interface Profile {
  id: number;
  subdomain: string;
  nama_desa: string;
  alamat: string;
  telepon: string;
  email: string;
  foto_depan?: string | null;
  twitter: string;
  instagram: string;
  visi: string;
  misi: string;
  tujuan: string;
  sejarah: string;
  gmaps_embed_url: string;
  lat: number | null;
  lng: number | null;
  created_at: string;
  updated_at: string;
}

export default function SejarahDesa({ subdomain }: Props) {
  const [desa, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/desa/subdomain/${subdomain}`);
      const data = await res.json();

      if (res.ok) {
        setProfile(data.data);
      } else {
        console.error("Error fetching komentar:", data.error);
        setProfile(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [subdomain]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6 border-b-4 border-[#C0B099] pb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sejarah
          </h1>
          <p className="text-lg text-gray-600">
            Menelusuri Jejak Sejarah Desa Kita
          </p>
        </div>

        <div className="bg-white max-w-4xl mx-auto">
          {/* Fetch data mulai dari sini */}
          <div className="mb-12">
            <h2 className="lg:text-3xl text-2xl font-bold text-primary mb-4">
              Sejarah Desa
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {desa?.sejarah || "Loading... Sejarah desa belum tersedia."}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
