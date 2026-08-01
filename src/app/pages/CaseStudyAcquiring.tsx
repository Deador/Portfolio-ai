import React from 'react';
import styles from './CaseStudyAcquiring.module.scss';
import { HeroSection } from '../../shared/ui/organisms/HeroSection/HeroSection';
import { ProblemSection } from '../../shared/ui/organisms/ProblemSection/ProblemSection';
import { GoalsSection } from '../../shared/ui/organisms/GoalsSection/GoalsSection';
import { ContextSection } from '../../shared/ui/organisms/ContextSection/ContextSection';
import { PersonaSection } from '../../shared/ui/organisms/PersonaSection/PersonaSection';
import { FeatureSection } from '../../shared/ui/organisms/FeatureSection/FeatureSection';
import { DecisionSection } from '../../shared/ui/organisms/DecisionSection/DecisionSection';
import { RetrospectiveSection } from '../../shared/ui/organisms/RetrospectiveSection/RetrospectiveSection';
import { ResultsSection } from '../../shared/ui/organisms/ResultsSection/ResultsSection';
import { ReflectionSection } from '../../shared/ui/organisms/ReflectionSection/ReflectionSection';
import { GrowthSection } from '../../shared/ui/organisms/GrowthSection/GrowthSection';
import { RolesTable } from '../../shared/ui/molecules/RolesTable/RolesTable';
import { CommonCard } from '../../shared/ui/molecules/CommonCard/CommonCard';

/**
 * CaseStudyAcquiring
 *
 * Complete case study page: "Система обработки заявок на эквайринг"
 * (B2B Acquiring Request Processing Platform)
 */
const CaseStudyAcquiring: React.FC = () => {
  return (
    <main className={styles.caseStudyPage}>
      <div className={styles.pageContainer}>
        {/* 1. Hero Section */}
        <section className={styles.section}>
          <HeroSection
            titleProps={{
              size: 'L',
              children: 'Система обработки заявок на эквайринг',
              description:
                'Внутренняя платформа для сотрудников банка, которая объединила работу менеджеров, службы безопасности и инженеров в одном процессе.',
            }}
            image={<div className={styles.imagePlaceholder}>Hero Image</div>}
            rows={[
              {
                label: 'Тип продукта',
                value: 'B2B-платформа для обработки заявок на эквайринг',
              },
              {
                label: 'Моя роль',
                value: 'Единственный дизайнер продукта',
              },
              {
                label: 'Зона ответственности',
                value: 'От исследования процессов до развития платформы после запуска MVP',
              },
              {
                label: 'Команда',
                value: 'BO, аналитики, разработчики, QA',
              },
            ]}
          />
        </section>

        {/* 2. Problem Section */}
        <section className={styles.section}>
          <ProblemSection
            titleProps={{
              size: 'M',
              children: 'Проблема',
            }}
            paragraphTitle="Обработка заявок занимала до 18 дней"
            paragraph={
              'Заявка проходила через несколько подразделений и систем. Сотрудники вручную ' +
              'переносили данные между инструментами, уточняли информацию через почту и тратили ' +
              'время на поиск актуальных статусов.\n\n' +
              'В результате процесс подключения эквайринга занимал недели, а часть клиентов ' +
              'уходила к конкурентам.'
            }
            cite={{
              text: 'Мы подали заявку, но не понимали, что происходит дальше. Через несколько дней решили подключить эквайринг в другом банке.',
              source: 'Предприниматель',
            }}
            cards={[
              {
                variant: 'insight',
                title: 'Работа в 5 системах',
                description: 'Данные приходилось переносить вручную',
              },
              {
                variant: 'insight',
                title: 'Коммуникация через почту',
                description: 'Согласования занимали дни',
              },
              {
                variant: 'insight',
                title: 'Нет данных по остаткам оборудования',
                description: 'Менеджеры уточняли информацию вручную',
              },
            ]}
          />
        </section>

        {/* 3. Goals Section */}
        <section className={styles.section}>
          <GoalsSection
            titleProps={{
              size: 'M',
              children: 'Почему проект стал приоритетом',
            }}
            cards={[
              {
                variant: 'number',
                number: '1',
                title: '18 дней подключение эквайринга',
              },
              {
                variant: 'number',
                number: '2',
                title: '5 систем использовали сотрудники',
              },
              {
                variant: 'number',
                number: '3',
                title: '3 подразделения участвовали в процессе',
              },
              {
                variant: 'number',
                number: '4',
                title: 'Почта основной канал коммуникации',
              },
            ]}
          />
        </section>

        {/* 4. Context Section - Role analysis with pie chart */}
        <section className={styles.section}>
          <ContextSection
            titleProps={{
              size: 'M',
              children: 'Начали с роли, которая давала максимальный эффект для бизнеса',
              description:
                'Менеджеры участвовали в обработке заявки на большинстве этапов процесса и проводили в нем около 60% рабочего времени.',
            }}
            image={<div className={styles.imagePlaceholder}>Pie Chart</div>}
            rows={[
              {
                title: 'Проверка данных клиента',
                description: 'Менеджеры первыми начинали работу с заявкой и координировали дальнейший процесс.',
              },
              {
                title: 'Подбор оборудования',
                description: 'Консультировали клиентов и помогали подобрать подходящую модель терминала',
              },
              {
                title: 'Контроль выполнения',
                description: 'Потребность отслеживать движение заявки между подразделениями.',
              },
            ]}
            card={{
              variant: 'risk',
              label: 'Системный подход',
              title: 'Не пытались автоматизировать всё сразу',
              description:
                'Вместо проектирования системы для всех подразделений одновременно сначала сфокусировались на роли, которая давала максимальный эффект для бизнеса.',
            }}
          />
        </section>

        {/* 5. Persona Section - Interview findings */}
        <section className={styles.section}>
          <PersonaSection
            titleProps={{
              size: 'M',
              children: 'Что показали интервью',
              description:
                'Интервью с менеджерами и инженерами помогли понять не только симптомы проблемы, но и причины, из-за которых процесс подключения занимал недели.',
            }}
            personas={[
              {
                tagText: 'Workflow',
                title: 'Переключение между системами',
                description:
                  'Для выполнения одной задачи сотрудники переносили данные между несколькими инструментами и постоянно теряли контекст работы.',
              },
              {
                tagText: 'Visibility',
                title: 'Нет единой картины по заявке',
                description:
                  'Информация о клиенте, оборудовании и статусах находилась в разных системах и обновлялась независимо друг от друга.',
              },
              {
                tagText: 'Dependencies',
                title: 'Зависимость от других отделов',
                description:
                  'Многие действия нельзя было выполнить самостоятельно — сотрудникам приходилось обращаться в смежные подразделения и ждать ответа.',
              },
            ]}
          />
        </section>

        {/* 6. Feature Section */}
        <section className={styles.section}>
          <FeatureSection
            titleProps={{
              size: 'M',
              children: 'Спроектировал рабочее место менеджера',
              description:
                'Сфокусировался на сценариях, которые сотрудники выполняли десятки раз в день и которые сильнее всего влияли на скорость обработки заявки.',
            }}
            image={<div className={styles.imagePlaceholder}>Feature</div>}
            metrics={[
              {
                type: 'short',
                number: 1,
                title: 'Контакт клиента всегда оставался в фокусе',
                description:
                  'Номер телефона вынесен в верхнюю часть карточки. Остальная информация доступна по запросу и не отвлекает от основной задачи.',
              },
              {
                type: 'short',
                number: 2,
                title: 'Тариф всегда оставался в контексте заявки',
                description:
                  'Менеджеры регулярно уточняли условия обслуживания. Тариф отображается прямо в рабочем интерфейсе без дополнительных переходов.',
              },
              {
                type: 'short',
                number: 3,
                title: 'Использовал привычные паттерны вместо новых механик',
                description:
                  'Сценарий выбора оборудования повторяет привычную механику маркетплейсов. Это позволило сократить когнитивную нагрузку и ускорить выполнение задачи.',
              },
              {
                type: 'short',
                number: 4,
                title: 'Выбор оборудования учитывал реальные ограничения',
                description:
                  'Фильтры спроектированы на основе данных склада и инженерных подразделений, а не только бизнес-требований.',
              },
            ]}
          />
        </section>

        {/* 7. Decision Section */}
        <section className={styles.section}>
          <DecisionSection
            titleProps={{
              size: 'M',
              children: 'Решения проверялись на пользователях до разработки',
            }}
            paragraph={
              'Раньше изменения сразу попадали в разработку. Я внедрил быстрые проверки на сотрудниках банка, чтобы находить проблемы ещё до реализации и снижать количество доработок после релиза.'
            }
            tag="19 коридорных тестов"
            image={<div className={styles.imagePlaceholder}>Timeline</div>}
            noteTitle="Что это дало команде"
            noteText={
              'Обратную связь начали получать до разработки. Это помогало выявлять спорные решения и уточнять сценарии до передачи задачи в команду.'
            }
          />
        </section>

        {/* 8. MVP growth: personas + roles table */}
        <section className={styles.section}>
          <div className={styles.mvpSection}>
            <PersonaSection
              titleProps={{
                size: 'M',
                children: 'Платформа выросла из MVP в единое рабочее пространство',
                description:
                  'MVP закрывал задачи менеджеров. По мере развития платформы в неё были добавлены новые роли с собственными сценариями работы и потребностями.',
              }}
              personas={[
                {
                  tagText: 'Версия 1.0',
                  title: 'Менеджеры',
                  description: 'Проверка заявок, подбор оборудования, сопровождение клиента, контроль прохождения заявки',
                },
                {
                  tagText: 'Версия 2.0',
                  title: 'Служба безопасности',
                  description: 'Проверка юридических данных клиента и принятие решения по согласованию заявки',
                },
                {
                  tagText: 'Версия 2.0',
                  title: 'Инженеры',
                  description: 'Установка оборудования, сопровождение торговых точек и управление парком терминалов',
                },
              ]}
            />

            <div className={styles.gapMapBlock}>
              <RolesTable
                title="Роли в платформе"
                description="Разные подразделения работали в одном продукте, поэтому роли и возможности пришлось адаптировать под разные сценарии работы."
                rows={[
                  {
                    role: 'Менеджеры',
                    version: 'Версия 1.0',
                    tasks:
                      '• Проверка заявок\n• Подбор оборудования\n• Сопровождение клиента\n• Контроль прохождения заявки',
                  },
                  {
                    role: 'Служба безопасности',
                    version: 'Версия 2.0',
                    tasks: '• Проверка юридических данных клиента\n• Принятие решения по согласованию заявки',
                  },
                  {
                    role: 'Инженеры',
                    version: 'Версия 2.0',
                    tasks: '• Установка оборудования\n• Сопровождение торговых точек\n• Управление парком терминалов',
                  },
                ]}
              />
              <div className={styles.gapCardSlot}>
                <CommonCard
                  variant="risk"
                  label="Системный подход"
                  title="Приоритизировали решение по влиянию на бизнес"
                  description={
                    'MVP решал проблемы одной роли. Со временем платформа стала единым рабочим пространством для трёх подразделений, участвующих в подключении эквайринга.'
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* 9. Context Section - Warehouse dependency */}
        <section className={styles.section}>
          <ContextSection
            titleProps={{
              size: 'M',
              children: 'Устранил зависимость между складом, инженерами и менеджерами',
              description:
                'По мере появления новых моделей терминалов возникали ситуации, когда оборудование уже находилось на складе, но отсутствовало в системе. Менеджеры не могли найти его через поиск и предложить клиенту, хотя фактически терминал был доступен для подключения',
            }}
            image={<div className={styles.imagePlaceholder}>Architecture</div>}
            rows={[
              {
                title: 'Новые модели терялись',
                description:
                  'Информация о новом оборудовании передавалась вручную между подразделениями и не всегда доходила до команды продукта.',
              },
              {
                title: 'Оборудование было скрыто',
                description: 'Менеджеры не видели часть терминалов в системе, даже если они уже находились на складе.',
              },
              {
                title: 'Терялись возможности продаж',
                description: 'Если нужная модель отсутствовала в интерфейсе, её нельзя было предложить клиенту.',
              },
            ]}
            card={{
              variant: 'risk',
              label: 'Системный подход',
              title: '',
              description:
                'Передал управление справочниками инженерам, чтобы новые модели оборудования появлялись в системе без участия команды разработки и были доступны менеджерам сразу после поступления на склад.',
            }}
          />
        </section>

        {/* 10. Context Section - Platform growth with persona cards */}
        <section className={styles.section}>
          <GrowthSection
            titleProps={{
              size: 'M',
              children: 'Развивал платформу в течение двух лет',
              description:
                'После запуска продолжил развивать продукт на основе запросов пользователей и постепенно закрывал ограничения первой версии.',
            }}
            items={[
              {
                image: <div className={styles.imagePlaceholder} style={{ height: 414 }}>Image 01</div>,
                persona: {
                  tagText: 'Инженеры',
                  title: 'История изменений',
                  description:
                    'Сделал процесс прозрачным\n\nИнженеры получили доступ ко всем изменениям по заявке и могли самостоятельно находить причину задержек без участия других команд.',
                },
              },
              {
                image: <div className={styles.imagePlaceholder} style={{ height: 763 }}>Image 02</div>,
                persona: {
                  tagText: 'Менеджеры',
                  title: 'Работа с документами',
                  description:
                    'Убрал переключение между системами\n\nМенеджеры получили возможность редактировать данные клиента, загружать документы и отслеживать изменения в одном интерфейсе.',
                },
              },
              {
                image: <div className={styles.imagePlaceholder} style={{ height: 451 }}>Image 03</div>,
                persona: {
                  tagText: 'Новый сценарий',
                  title: 'Замена терминала',
                  description:
                    'Сократил путь для клиента\n\nЗамена оборудования стала возможна без повторного оформления заявки и прохождения полного процесса подключения.',
                },
              },
            ]}
          />
        </section>

        {/* 11. Retrospective Section */}
        <section className={styles.section}>
          <RetrospectiveSection
            titleProps={{
              size: 'M',
              children: 'Что сделал бы иначе?',
            }}
            cards={[
              {
                variant: 'lesson',
                number: 1,
                title: 'Добился бы аналитики ещё на старте',
                description:
                  'Без продуктовых метрик часть решений приходилось принимать на основе экспертной оценки и обратной связи пользователей.',
              },
              {
                variant: 'lesson',
                number: 2,
                title: 'Активнее защищал бы решения перед бизнесом',
                description:
                  'Не все полезные улучшения попадали в разработку. Сегодня связываю UX-решения с бизнес-эффектом еще на этапе обсуждения.',
              },
              {
                variant: 'lesson',
                number: 3,
                title: 'Быстрее собирал бы модель продукта',
                description:
                  'На старте многие решения принимались в условиях высокой неопределенности. Сегодня быстрее собираю процессы и роли в единую модель продукта.',
              },
            ]}
          />
        </section>

        {/* 12. Results Section */}
        <section className={styles.section}>
          <ResultsSection
            titleProps={{
              size: 'M',
              children: 'Результаты',
            }}
            results={[
              {
                size: 'L',
                title: '18 → 2 дня',
                description: 'Сократили средний срок подключения эквайринга',
              },
              {
                size: 'L',
                title: '5 → 1 система',
                description: 'Объединили работу сотрудников в одном интерфейсе',
              },
              {
                size: 'L',
                title: '+27%',
                description: 'Рост подключений эквайринга',
              },
              {
                size: 'L',
                title: '-48%',
                description: 'Снизилось количество дефектов после внедрения дизайн-ревью',
              },
            ]}
          />
        </section>

        {/* 13. Reflection Section */}
        <section className={`${styles.section} ${styles.sectionLeft}`}>
          <ReflectionSection
            title="Главный вывод проекта"
            paragraph={
              'Самые дорогие проблемы продукта находились не в интерфейсе, а в процессе взаимодействия между подразделениями банка.\n\n' +
              'Чтобы сократить срок подключения эквайринга, было важно не только спроектировать рабочее место менеджера, но и выстроить единый процесс для нескольких ролей, постепенно превращая MVP в общую платформу для всего цикла подключения клиентов.'
            }
            header="Единственный дизайнер проекта, отвечал за:"
            items={[
              'исследование процессов и пользовательских ролей',
              'проектирование MVP и развитие платформы',
              'внедрение практики ранней проверки решений',
              'проектирование сценариев для менеджеров, инженеров и службы безопасности',
              'сопровождение разработки',
            ]}
          />
        </section>
      </div>
    </main>
  );
};

export default CaseStudyAcquiring;
