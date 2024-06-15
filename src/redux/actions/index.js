import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './../../utils/api';

export const getLanguages = createAsyncThunk(
  'languages/getLanguages',
  async () => {
    try {
      const res = await api.get('/getLanguages');
      return res.data.data.languages; // Yanıtın doğru kısmını return edin
    } catch (error) {
      console.error('Diller alınırken hata oluştu:', error);
      throw error;
    }
  }
);

export const translateText = createAsyncThunk(
  "translate",
  async (p) => {
    const params = new URLSearchParams();
    console.log(p);

    // Parametreleri doğru bir şekilde ayarlayın
    params.set("source_language", p.sourceLang.value);
    params.set("target_language", p.targetLang.value); // Parametre adının doğru olduğundan emin olun
    params.set("text", p.text); // p.text doğrudan kullanın

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    try {
      const res = await api.post("/translate", params, { headers });
      console.log(res);
      //payloadı belirle
      return res.data.data;
    } catch (error) {
      console.error('Çeviri yapılırken hata oluştu:', error);
      throw error;
    }
  }
);
