'use client';

//  ** import third party: 
import translatte from 'translate';


export const customeTranslate = async (targetLanguage, randomText, fromLanguage) => {
  async function translate(text, target, from) {
    try {
      const response = await translatte(text, {from:from, to: target });
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const trans = await translate(randomText, targetLanguage, fromLanguage);

  return {
    success: true,
    data: trans,
  };
};
