interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm">{question}</h4>
      <p className="text-muted-foreground text-sm">{answer}</p>
    </div>
  );
};

interface FAQTabProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQTab = ({ faqs }: FAQTabProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-4">
      <h3 className="font-semibold">Perguntas Frequentes</h3>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
};
