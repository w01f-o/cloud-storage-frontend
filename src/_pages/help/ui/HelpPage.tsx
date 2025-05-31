import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/_shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const HelpPage: FC = () => {
  const t = useTranslations('HelpPage');
  const faqList = t.raw('questions') as { q: string; a: string }[];

  return (
    <div className='py-6'>
      <Accordion type='single' collapsible>
        {faqList.map((question, index) => (
          <AccordionItem value={question.q} key={index}>
            <AccordionTrigger>{question.q}</AccordionTrigger>
            <AccordionContent>{question.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
