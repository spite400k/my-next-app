"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Plan {
  id: string;
  keyword: string;
  structure: string[];
  audience: string;
  created_at: string;
}

export default function PlansList() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      const { data, error } = await supabase
        .from("trn_article_plans")
        .select("id, keyword, structure, audience, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) setPlans(data);
    };

    fetchPlans();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">保存された構成一覧</h1>
      {plans.length === 0 ? (
        <p className="text-gray-500">まだ保存された構成がありません。</p>
      ) : (
        <ul className="space-y-4">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className="border rounded-lg p-4 bg-white shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{plan.keyword}</h2>
              <p className="text-sm text-gray-500 mb-1">読者像: {plan.audience}</p>
              <ol className="list-decimal pl-6 text-sm text-gray-700">
                {plan.structure.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
