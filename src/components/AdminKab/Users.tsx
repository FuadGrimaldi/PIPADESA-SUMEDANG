"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Plus,
  Edit3,
  Trash2,
  Search,
  Save,
  X,
  View,
} from "lucide-react";

type User = {
  id: number;
  desa_id: number | null;
  nik: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null;
};

interface UserProps {
  role: string;
}

export default function UserManagerKab({ role }: UserProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [viewData, setViewData] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [desaList, setDesaList] = useState<any[]>([]);

  const fetchDesaList = useCallback(async () => {
    try {
      const res = await fetch("/api/desa");
      const data = await res.json();
      setDesaList(data.data || []);
    } catch (error) {
      setDesaList([]);
      console.error("Fetch desa error:", error);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal memuat data Users");
      }
      // Filter users by role 'admin_kab'
      const filtered = (data || []).filter((user: User) => user.role === role);
      setUsers(filtered);
      setFilteredUsers(filtered);
    } catch (error) {
      console.error("Fetch users error:", error);
      setUsers([]);
      setFilteredUsers([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data Users",
      });
    }
    setLoading(false);
  }, [role]);

  useEffect(() => {
    fetchUsers();
    fetchDesaList();
  }, [fetchUsers, fetchDesaList]);

  const handleOpenAdd = () => {
    setEditData(null);
    setViewData(null);
    setModalOpen(true);
  };

  const handleOpenView = (user: User) => {
    setViewData(user);
    setEditData(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditData(user);
    setViewData(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setViewData(null);
    setEditData(null);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus user ini?",
      text: "Data yang sudah dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchUsers();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "User berhasil dihapus!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menghapus user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghapus user",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let res;
      if (editData) {
        if (!formData.get("status")) {
          formData.set("status", "approved");
        }
        res = await fetch(`/api/users/${editData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        if (!formData.get("status")) {
          formData.set("status", "approved");
        }
        res = await fetch("/api/users", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        setModalOpen(false);
        await fetchUsers();
        Swal.fire({
          position: "top",
          icon: "success",
          title: `User berhasil ${editData ? "diperbarui" : "ditambahkan"}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.error || "Terjadi kesalahan",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menyimpan data",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.username.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value) ||
            user.role.toLowerCase().includes(value) ||
            user.profile_desa?.nama_desa.toLowerCase().includes(value) ||
            user.full_name.toLowerCase().includes(value) ||
            user.nik.toLowerCase().includes(value)
        )
      );
    }
  };

  // Modal Form Component for User
  const ModalForm = () => {
    const isView = !!viewData;
    const isEdit = !!editData && !viewData;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {isView ? (
                <>Detail User</>
              ) : isEdit ? (
                <>
                  <Edit3 className="w-6 h-6" /> Edit User
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" /> Tambah User
                </>
              )}
            </h2>
            <button
              onClick={handleCloseModal}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={submitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIK *
                  </label>
                  <input
                    type="text"
                    name="nik"
                    defaultValue={viewData?.nik || editData?.nik || ""}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={
                      viewData?.username || editData?.username || ""
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fullname *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    defaultValue={
                      viewData?.full_name || editData?.full_name || ""
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={viewData?.email || editData?.email || ""}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isView || submitting}
                    readOnly={isView}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    defaultValue={viewData?.role || editData?.role || ""}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isView || submitting}
                  >
                    <option value="">Pilih Role</option>
                    <option value="admin_kab">Admin Kabupaten</option>
                    <option value="admin_desa">Admin Desa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desa *
                  </label>
                  <select
                    name="desa_id"
                    defaultValue={
                      viewData?.desa_id !== null &&
                      viewData?.desa_id !== undefined
                        ? viewData.desa_id
                        : editData?.desa_id !== null &&
                          editData?.desa_id !== undefined
                        ? editData.desa_id
                        : ""
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                    disabled={isView || submitting}
                  >
                    <option value="">Pilih Desa</option>
                    {desaList.map((desa) => (
                      <option key={desa.id} value={desa.id}>
                        {desa.nama_desa}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password {editData ? "(kosongkan jika tidak diubah)" : "*"}
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={
                      editData
                        ? "Kosongkan jika tidak diubah"
                        : "Minimal 6 karakter"
                    }
                    disabled={isView || submitting}
                    required={!editData && !isView} // wajib saat tambah, opsional saat edit
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                disabled={submitting}
              >
                <X className="w-4 h-4" /> Batal
              </button>
              {!isView && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-xl shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6" /> Manajemen Users
          </h2>
          <p className="text-green-100 mt-1">Kelola data user di kabupaten</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Tambah User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari username, email, role, atau desa..."
            value={searchTerm}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            onChange={handleSearch}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Memuat data...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Globe className="mx-auto w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {searchTerm ? "Tidak ada hasil pencarian" : "Belum ada data user"}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Coba ubah kata kunci pencarian"
              : "Klik tombol 'Tambah User' untuk menambah data user"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Desa
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      {user.profile_desa?.nama_desa || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenView(user)}
                          className="p-2 bg-green-500 text-white rounded-lg"
                        >
                          <View className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(user)}
                          className="p-2 bg-yellow-500 text-white rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 bg-red-600 text-white rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && <ModalForm />}
    </div>
  );
}
