import React, { useState, useEffect } from 'react';

const VotingSystem = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock fetch - replace with actual API call
    fetch('/api/proposals')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setProposals(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (proposalId) => {
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId: 'user_123', // From Pi Auth
            proposalId: proposalId,
            voteChoice: 'yes',
            signature: 'mock_sig'
        })
      });
      
      if (response.ok) {
        alert('Vote cast successfully!');
      } else {
        throw new Error('Failed to cast vote');
      }
    } catch (err) {
      console.error(err);
      alert('Error casting vote');
    }
  };

  if (loading) return <div className="p-4">Loading Civic Constitution...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Active Proposals</h2>
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="border p-4 rounded shadow-sm bg-white">
            <h3 className="text-xl font-semibold">{proposal.title}</h3>
            <p className="text-gray-600 mb-4">{proposal.description}</p>
            <button 
              onClick={() => handleVote(proposal.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Vote Yes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingSystem;
