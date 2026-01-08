import { PromptBlockData } from '../types';

const API_URL = '/api';

export const apiService = {
  async getBlocks(): Promise<PromptBlockData[]> {
    const response = await fetch(`${API_URL}/blocks`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },

  async createBlock(block: Partial<PromptBlockData>): Promise<PromptBlockData> {
    const response = await fetch(`${API_URL}/blocks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(block),
    });
    if (!response.ok) throw new Error('Failed to create');
    return response.json();
  },

  async updateBlock(id: string, block: Partial<PromptBlockData>): Promise<PromptBlockData> {
    const response = await fetch(`${API_URL}/blocks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(block),
    });
    if (!response.ok) throw new Error('Failed to update');
    return response.json();
  },

  async deleteBlock(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/blocks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete');
  }
};
