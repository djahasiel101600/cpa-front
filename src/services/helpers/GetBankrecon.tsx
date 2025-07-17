import { useEffect, useState } from "react";
import { axios_instance } from "../Api";
import { type IAR } from "@/components/table/IAR/columns";

export function useBankReconData() {
    const [data, setData] = useState<IAR[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const response = await axios_instance.get('bankrecon', {
                    signal: controller.signal,
                });
                setData(response.data);
            } catch (err) {
                setError('Fetch error');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        return () => controller.abort();
    }, []);

    return { data, loading, error };
}