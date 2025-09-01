import { useState, useEffect, useCallback } from "react";
import { MessageCircle, Send, User, Phone, Mail, Calendar } from "lucide-react";

// TypeScript interfaces
interface Comment {
  id: number;
  desa_id: number;
  article_id: number;
  name: string;
  no_telp: string;
  email: string;
  pesan: string;
  status: string;
  created_at: string;
}

interface CommentFormData {
  name: string;
  no_telp: string;
  email: string;
  pesan: string;
  status?: string;
}

interface CommentSectionProps {
  articleId: number;
  desaId: number;
}

export default function CommentSection({
  articleId,
  desaId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [formData, setFormData] = useState<CommentFormData>({
    name: "",
    no_telp: "",
    email: "",
    pesan: "",
    status: "pending",
  });
  const [errors, setErrors] = useState<Partial<CommentFormData>>({});

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/komentar/article/${articleId}`);
      if (response.ok) {
        const data = (await response.json()) as Comment[];
        // Filter only approved comments
        const approvedComments = data.filter(
          (comment) => comment.status === "approved"
        );
        setComments(approvedComments || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    if (articleId) {
      fetchComments();
    }
  }, [articleId, fetchComments]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: Partial<CommentFormData> = {};
    if (!formData.name.trim()) newErrors.name = "name wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
    if (!formData.pesan.trim()) newErrors.pesan = "Pesan wajib diisi";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Phone validation (optional)
    if (
      formData.no_telp &&
      !/^\d+$/.test(formData.no_telp.replace(/[\s-+()]/g, ""))
    ) {
      newErrors.no_telp = "Format nomor telepon tidak valid";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/komentar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          article_id: articleId,
          desa_id: desaId,
          ...formData,
          created_at: new Date(),
          updated_at: new Date(),
        }),
      });

      if (response.ok) {
        // Reset form
        setFormData({ name: "", no_telp: "", email: "", pesan: "" });
        setShowCommentForm(false);

        // Refresh comments
        fetchComments();

        // Show success message (you can customize this)
        alert("Komentar berhasil dikirim!");
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Gagal mengirim komentar. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof CommentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="border-t border-gray-200 pt-3 px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Komentar ({comments.length})
          </h2>
        </div>

        {!showCommentForm && (
          <button
            onClick={() => setShowCommentForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Tulis Komentar
          </button>
        )}
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Tulis Komentar
            </h3>
            <button
              onClick={() => {
                setShowCommentForm(false);
                setFormData({ name: "", no_telp: "", email: "", pesan: "" });
                setErrors({});
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  nama <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Masukkan name Anda"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="name@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="no_telp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nomor Telepon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  id="no_telp"
                  name="no_telp"
                  value={formData.no_telp}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.no_telp ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              {errors.no_telp && (
                <p className="mt-1 text-sm text-red-600">{errors.no_telp}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="pesan"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pesan <span className="text-red-500">*</span>
              </label>
              <textarea
                id="pesan"
                name="pesan"
                rows={4}
                value={formData.pesan}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  errors.pesan ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Tulis komentar Anda di sini..."
              ></textarea>
              {errors.pesan && (
                <p className="mt-1 text-sm text-red-600">{errors.pesan}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowCommentForm(false);
                  setFormData({ name: "", no_telp: "", email: "", pesan: "" });
                  setErrors({});
                }}
                className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Mengirim...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Komentar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada komentar
            </h3>
            <p className="text-gray-500 mb-4">
              Jadilah yang pertama memberikan komentar
            </p>
            {!showCommentForm && (
              <button
                onClick={() => setShowCommentForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Tulis Komentar Pertama
              </button>
            )}
          </div>
        ) : (
          // Comments
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow mb-4"
            >
              <div className="flex space-x-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(comment.name)}
                  </div>
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  {/* Comment Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {comment.name}
                      </h4>
                      {comment.email && (
                        <span className="text-xs text-gray-500">
                          ({comment.email})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(comment.created_at)}
                    </div>
                  </div>

                  {/* Comment Message */}
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {comment.pesan.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < comment.pesan.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
