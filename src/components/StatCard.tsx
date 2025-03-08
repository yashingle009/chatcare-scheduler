
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface StatDetail {
  label: string;
  value: string;
  color: string;
}

interface StatCardProps {
  title: string;
  value?: string;
  subtitle?: string;
  details?: StatDetail[];
  chart?: boolean;
  showStars?: boolean;
  customContent?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  details,
  chart = false,
  showStars = false,
  customContent
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chart && chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      
      const option = {
        animation: false,
        grid: {
          left: '0%',
          right: '0%',
          top: '0%',
          bottom: '0%'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          show: false
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
          color: '#4F46E5',
          symbol: 'none',
          lineStyle: {
            width: 2
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(79, 70, 229, 0.3)'
              }, {
                offset: 1,
                color: 'rgba(79, 70, 229, 0.0)'
              }]
            }
          }
        }]
      };
      
      chartInstance.setOption(option);
      
      const handleResize = () => {
        chartInstance.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        chartInstance.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [chart]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 h-full">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        
        {customContent ? (
          <div className="mt-2">{customContent}</div>
        ) : (
          <div className="mt-2">
            {value && (
              <div className="flex items-baseline">
                <p className="text-3xl font-bold">{value}</p>
                
                {showStars && (
                  <div className="ml-2 flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
            
            {details && details.length > 0 && (
              <div className="flex flex-col text-sm mt-2 space-y-1">
                {details.map((detail, index) => (
                  <span key={index} className={detail.color}>
                    {detail.value} {detail.label}
                  </span>
                ))}
              </div>
            )}
            
            {chart && (
              <div ref={chartRef} className="h-20 mt-2" />
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default StatCard;
