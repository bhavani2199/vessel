# Vessel

## Why I'm building this

I'm a developer. Some days I feel busy the whole day and still can't tell if I actually moved forward or just reacted to whatever pulled my attention. I wanted a way to actually see that, instead of guessing.

This isn't a corporate tool. It's not ClickUp, it's not Jira, it's not another team dashboard, those are built for managers to see the team. Vessel is built for me to see myself. It's a private workspace to manage my own focus, protect my energy, and keep a record of my own progress.

It's built around problems I actually have:

**Big ambiguous tasks freeze me.** "Project X — 2 hours" is a wall. My brain won't start climbing it. But 15 minutes? No panic. So Vessel works in 15-minute sprints by default, small enough that starting is never the hard part.

**Distractions derail me.** When I'm deep in something and a distraction hits, a thought, an urge to check something, a task I suddenly remember. I either break focus to deal with it, or hold it in my head and lose focus anyway. Both are bad. Vessel's answer: park it, don't act on it. Get back to what I was doing. Deal with the parked stuff later, on my terms.

**Seeing my whole day at once is overwhelming.** A vertical list of open tasks staring back at me creates dread before I've even started. So during a focus session, Vessel hides everything except the one task I'm on. One card. One timer. That's it.

**Unfinished tasks turn into guilt.** If a sprint ends and the task isn't done, I don't prolong it and I don't beat myself up. It drops back into the queue, I move to something else, and I come back to it later with a fresh head. Clean slate, every sprint.

Breaks are allowed. They're built in, not something I fight against. This is about staying honest with myself and having a record I can look back on, not another scoreboard to feel behind on.

## Design principle: soft defaults, one-tap override

Every rule in Vessel is a default, never a lock. The 15-minute sprint is a default, if I'm in flow when it ends, one tap keeps going. The gratitude prompt appears front and center when I open the app but there's always a skip. A rule that becomes a wall on a bad day is the exact failure mode this tool exists to remove. Awareness, not enforcement.

## The core idea: a state machine

I don't want scattered booleans (isRunning, isPaused, isDistracted) that can combine into states that make no sense like running and paused at the same time. So the focus session is one state, always exactly one of:

- idle \- nothing running; full dashboard visible  
- focusing \- timer active; everything hidden except the current task card  
- paused \- stopped, session not over  
- pivoting \- distraction hit; Pivot Modal open, deciding what to do  
- holding \- distraction parked in the vault; back to focusing

Legal transitions only: idle → focusing (start) · focusing ⇄ paused · focusing → pivoting (distraction) · pivoting → holding (park it) · pivoting → focusing (dismiss) · focusing → idle (end)

Anything else is a bug, and the type system and tests should catch it.

Distraction capture: tap "Distracted?", type a quick note, get dropped straight back into focusing. The note lands in the Holding Vault, tied to that session. I review the vault after mark things done or discarding them. No auto-processing in v1.

When a sprint timer hits zero: one choice appears whether keep going or pivot. Pivot means the task drops to the bottom of the queue, no guilt, and the next task comes up.

## What's in v1

Building and committing in this order, one commit per step:

1. **State machine** (features/focus/domain) \- types and transition function, pure logic, no UI, no database  
2. **State machine tests** \- every legal transition passes, every illegal one is rejected. This is the proof the foundation is solid before anything gets built on it  
3. **Ring timer UI** \- driven by the state machine, not the other way around  
4. **Pivot Modal \+ Holding Vault** \- the distraction flow  
5. **Supabase schema \+ repository layer** —-sessions and distractions persist  
6. **To-do queue** \- separate module, single-card focus view, manual pivot-to-bottom  
7. **Dashboard shell** \- nav, stat cards, idle/focus mode switch  
8. **Weekly stats chart** \- daily focus hours from real session data  
9. **Gratitude prompt and log** \- soft prompt on open (skippable), entries in side panel, own table

**Not in v1**: mandatory gates or lockouts, momentum-based queue reordering, AI suggestions, calendar, notifications, mobile. Some of these need real usage data before I'd know how to build them right, guessing now is scope creep before the core loop even works.

## The two modes

The state machine drives what the dashboard shows:

**Idle mode** \- full dashboard. Gratitude prompt (slim bar, skippable) at top, stat cards (focus today, sessions, parked, streak), ring timer ready to start, today's queue and holding vault in the side panel, weekly bar chart at the bottom.

**Focus mode** \- the visual shield. Everything disappears except one task card, the ring timer, pause and "Distracted?" buttons, and a faint "next up" peek. The dashboard gets out of my way the moment work starts.

## Data

- **Focus\_sessions** : id, started\_at, ended\_at, duration\_seconds, status  
- **distractions** : id, session\_id, note, created\_at, resolution (done / discarded / pending)  
- **Todos** : id, title, done, position, created\_at  
- **gratitude\_entries** : id, entry\_date, note, created\_at

## Done when

- State machine can't be pushed into an invalid state and the tests prove it  
- One complete session (start → distraction → pivot → resume → end) works end to end and actually saves to Supabase  
- Dashboard shows my real numbers, not placeholder data  
- To-do and gratitude are things I'd actually use daily  
- Every module follows the same data/domain/application split I already use elsewhere  
- Commit history reads as a story, step by step, not one giant dump

## Known risk

Tracking own focus can turn into another scoreboard to feel bad about. That's not the point. The point is seeing the pattern, not judging the number. If low-focus days start feeling like failure instead of information, the tool has failed at its actual job. Same reason nothing in Vessel is mandatory: a tool built to remove walls shouldn't be adding new ones.  
