import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CropPrice {
  name: string;
  price: number;
  unit: string;
  change: number;
  trending: 'up' | 'down';
}

const MarketPrices = () => {
  // Mock market prices - in production, this would fetch real-time data
  const cropPrices: CropPrice[] = [
    {
      name: 'Maize',
      price: 850,
      unit: 'per kg',
      change: 2.5,
      trending: 'up'
    },
    {
      name: 'Beans',
      price: 1200,
      unit: 'per kg', 
      change: -1.2,
      trending: 'down'
    },
    {
      name: 'Rice',
      price: 950,
      unit: 'per kg',
      change: 3.1,
      trending: 'up'
    },
    {
      name: 'Millet',
      price: 720,
      unit: 'per kg',
      change: 0.8,
      trending: 'up'
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cropPrices.map((crop) => (
        <Card key={crop.name} className="text-center">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {crop.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">
                ₦{crop.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {crop.unit}
              </div>
              <div className={`flex items-center justify-center space-x-1 text-sm ${
                crop.trending === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {crop.trending === 'up' ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                <span>
                  {crop.change > 0 ? '+' : ''}{crop.change}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MarketPrices;
