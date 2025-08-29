"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface SdgsScore {
  id: number;
  desa_id: number;
  sdgs_id: number;
  score: number;
  tahun: number;
  profile_desa?: {
    id: number;
    nama_desa: string;
  } | null;
  sdgs?: {
    id: number;
    title: string;
    image: string;
  } | null;
}

interface SdgsGoal {
  id: number;
  title: string;
  image: string;
}

interface AllSdgsScoreProps {
  desaId?: number;
}

const AllSDGS = ({ desaId }: AllSdgsScoreProps) => {
  const [goals, setGoals] = useState<SdgsGoal[]>([]);
  const [scores, setScores] = useState<SdgsScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Ambil master SDGs
      const goalRes = await fetch("/api/sdgs");
      if (!goalRes.ok) throw new Error("Gagal mengambil daftar SDGs");
      const goalData: SdgsGoal[] = await goalRes.json();
      setGoals(goalData);

      // 2. Ambil skor desa
      if (desaId) {
        const scoreRes = await fetch(`/api/sdgs/score/subdomain/${desaId}`);
        if (scoreRes.ok) {
          const scoreData: SdgsScore[] = await scoreRes.json();
          setScores(scoreData);
        } else {
          setScores([]);
        }
      } else {
        setScores([]);
      }
    } catch (err: any) {
      console.error("Error fetch SDGs:", err);
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, [desaId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // mapping score by goalId
  const scoreMap = useMemo(() => {
    const map: Record<number, number> = {};
    scores.forEach((s) => {
      map[s.sdgs_id] = s.score;
    });
    return map;
  }, [scores]);

  // average score
  const averageScore = useMemo(() => {
    if (goals.length === 0) return 0;
    const total = goals.reduce((sum, g) => sum + (scoreMap[g.id] ?? 0), 0);
    return total / goals.length;
  }, [goals, scoreMap]);

  if (loading) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-6 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                SDGs Desa
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Pencapaian Sustainable Development Goals (SDGs) Desa
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="mb-6 w-full border-b-4 border-[#C0B099]">
            <div className="mb-6 text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
                SDGs Desa
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Pencapaian Sustainable Development Goals (SDGs) Desa
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 w-full border-b-4 border-[#C0B099]">
          <div className="mb-6 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              SDGs Desa
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Pencapaian Sustainable Development Goals (SDGs) Desa
            </p>
            <div className="mt-4 text-xl font-semibold text-green-700">
              📊 Rata-rata Skor: {averageScore.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Grid SDGs Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <Image
                src={goal.image}
                alt={goal.title}
                className="w-full h-40 object-contain"
                width={400}
                height={400}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{goal.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Skor:{" "}
                  <span className="font-semibold">
                    {scoreMap[goal.id] ?? 0}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AllSDGS;
