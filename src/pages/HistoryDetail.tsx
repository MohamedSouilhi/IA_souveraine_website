import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HistoryDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/history/${id}`); // Assuming an endpoint for individual records
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status !== 'success' || !data.results.length) {
          throw new Error('No data found');
        }
        setDetail(data.results[0]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!detail) return <div>No details available</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Détails de l'Extraction</h2>
      <div>Filename: {detail.filename}</div>
      <div>Date: {detail.created_at}</div>
      <div>Text: {detail.text}</div>
      <div>Confidence: {detail.confidence}</div>
      <div>Bounding Box: {JSON.stringify(detail.bounding_box)}</div>
    </div>
  );
};

export default HistoryDetail;