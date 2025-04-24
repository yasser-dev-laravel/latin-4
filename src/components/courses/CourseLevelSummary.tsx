
interface CourseLevelSummaryProps {
  totalDuration: number;
  totalPrice: number;
}

const CourseLevelSummary = ({ totalDuration, totalPrice }: CourseLevelSummaryProps) => (
  <div className="text-sm">
    <div>
      إجمالي المدة: <span className="font-medium">{totalDuration} ساعة</span>
    </div>
    <div>
      إجمالي السعر: <span className="font-medium">{totalPrice} ج.م</span>
    </div>
  </div>
);

export default CourseLevelSummary;
