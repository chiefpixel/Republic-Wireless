/*!
 * VERSION: beta 1.9.7
 * DATE: 2013-05-16
 * UPDATES AND DOCS AT: http://www.greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
(window._gsQueue || (window._gsQueue = [])).push(function() {
    "use strict";
    window._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var r = [].slice,
            i = function(e, t, r) {
                n.call(this, e, t, r), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0
            },
            s = function(e) {
                return e.jquery || e.length && e[0] && e[0].nodeType && e[0].style
            },
            o = i.prototype = n.to({}, .1, {}),
            u = [];
        i.version = "1.9.7", o.constructor = i, o.kill()._gc = !1, i.killTweensOf = i.killDelayedCallsTo = n.killTweensOf, i.getTweensOf = n.getTweensOf, i.ticker = n.ticker, o.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), n.prototype.invalidate.call(this)
        }, o.updateTo = function(e, t) {
            var r, i = this.ratio;
            t && this.timeline && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (r in e) this.vars[r] = e[r];
            if (this._initted) if (t) this._initted = !1;
            else if (this._notifyPluginsOfEnabled && this._firstPT && n._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                var s = this._time;
                this.render(0, !0, !1), this._initted = !1, this.render(s, !0, !1)
            } else if (this._time > 0) {
                this._initted = !1, this._init();
                for (var o, u = 1 / (1 - i), a = this._firstPT; a;) o = a.s + a.c, a.c *= u, a.s = o - a.c, a = a._next
            }
            return this
        }, o.render = function(e, t, n) {
            var r, i, s, o, a, f, l, c = this._dirty ? this.totalDuration() : this._totalDuration,
                h = this._time,
                p = this._totalTime,
                d = this._cycle;
            if (e >= c ? (this._totalTime = c, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, i = "onComplete"), 0 === this._duration && ((0 === e || 0 > this._rawPrevTime) && this._rawPrevTime !== e && (n = !0, this._rawPrevTime > 0 && (i = "onReverseComplete", t && (e = -1))), this._rawPrevTime = e)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== p || 0 === this._duration && this._rawPrevTime > 0) && (i = "onReverseComplete", r = this._reversed), 0 > e ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (n = !0), this._rawPrevTime = e)) : this._initted || (n = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (o = this._duration + this._repeatDelay, this._cycle = this._totalTime / o >> 0, 0 !== this._cycle && this._cycle === this._totalTime / o && this._cycle--, this._time = this._totalTime - this._cycle * o, this._yoyo && 0 !== (1 & this._cycle) && (this._time = this._duration - this._time), this._time > this._duration ? this._time = this._duration : 0 > this._time && (this._time = 0)), this._easeType ? (a = this._time / this._duration, f = this._easeType, l = this._easePower, (1 === f || 3 === f && a >= .5) && (a = 1 - a), 3 === f && (a *= 2), 1 === l ? a *= a : 2 === l ? a *= a * a : 3 === l ? a *= a * a * a : 4 === l && (a *= a * a * a * a), this.ratio = 1 === f ? 1 - a : 2 === f ? a : .5 > this._time / this._duration ? a / 2 : 1 - a / 2) : this.ratio = this._ease.getRatio(this._time / this._duration)), h === this._time && !n) return p !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)), void 0;
            if (!this._initted) {
                if (this._init(), !this._initted) return;
                this._time && !r ? this.ratio = this._ease.getRatio(this._time / this._duration) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._active || this._paused || (this._active = !0), 0 === p && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === this._duration) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || u))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
            this._onUpdate && (0 > e && this._startAt && this._startAt.render(e, t, n), t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)), this._cycle !== d && (t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || u)), i && (this._gc || (0 > e && this._startAt && !this._onUpdate && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || u)))
        }, i.to = function(e, t, n) {
            return new i(e, t, n)
        }, i.from = function(e, t, n) {
            return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new i(e, t, n)
        }, i.fromTo = function(e, t, n, r) {
            return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new i(e, t, r)
        }, i.staggerTo = i.allTo = function(e, t, o, a, f, l, c) {
            a = a || 0;
            var h, p, d, v, m = o.delay || 0,
                g = [],
                y = function() {
                    o.onComplete && o.onComplete.apply(o.onCompleteScope || this, o.onCompleteParams || u), f.apply(c || this, l || u)
                };
            for (e instanceof Array || ("string" == typeof e && (e = n.selector(e) || e), s(e) && (e = r.call(e, 0))), h = e.length, d = 0; h > d; d++) {
                p = {};
                for (v in o) p[v] = o[v];
                p.delay = m, d === h - 1 && f && (p.onComplete = y), g[d] = new i(e[d], t, p), m += a
            }
            return g
        }, i.staggerFrom = i.allFrom = function(e, t, n, r, s, o, u) {
            return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, i.staggerTo(e, t, n, r, s, o, u)
        }, i.staggerFromTo = i.allFromTo = function(e, t, n, r, s, o, u, a) {
            return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, i.staggerTo(e, t, r, s, o, u, a)
        }, i.delayedCall = function(e, t, n, r, s) {
            return new i(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                onCompleteScope: r,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                onReverseCompleteScope: r,
                immediateRender: !1,
                useFrames: s,
                overwrite: 0
            })
        }, i.set = function(e, t) {
            return new i(e, 0, t)
        }, i.isTweening = function(e) {
            for (var t, r = n.getTweensOf(e), i = r.length; --i > -1;) if (t = r[i], t._active || t._startTime === t._timeline._time && t._timeline._active) return !0;
            return !1
        };
        var a = function(e, t) {
                for (var r = [], i = 0, s = e._first; s;) s instanceof n ? r[i++] = s : (t && (r[i++] = s), r = r.concat(a(s, t)), i = r.length), s = s._next;
                return r
            },
            f = i.getAllTweens = function(t) {
                return a(e._rootTimeline, t).concat(a(e._rootFramesTimeline, t))
            };
        i.killAll = function(e, n, r, i) {
            null == n && (n = !0), null == r && (r = !0);
            var s, o, u, a = f(0 != i),
                l = a.length,
                c = n && r && i;
            for (u = 0; l > u; u++) o = a[u], (c || o instanceof t || (s = o.target === o.vars.onComplete) && r || n && !s) && (e ? o.totalTime(o.totalDuration()) : o._enabled(!1, !1))
        }, i.killChildTweensOf = function(e, t) {
            if (null != e) {
                var o, u, a, f, l, c = n._tweenLookup;
                if ("string" == typeof e && (e = n.selector(e) || e), s(e) && (e = r(e, 0)), e instanceof Array) for (f = e.length; --f > -1;) i.killChildTweensOf(e[f], t);
                else {
                    o = [];
                    for (a in c) for (u = c[a].target.parentNode; u;) u === e && (o = o.concat(c[a].tweens)), u = u.parentNode;
                    for (l = o.length, f = 0; l > f; f++) t && o[f].totalTime(o[f].totalDuration()), o[f]._enabled(!1, !1)
                }
            }
        };
        var l = function(e, n, r, i) {
                void 0 === n && (n = !0), void 0 === r && (r = !0);
                for (var s, o, u = f(i), a = n && r && i, l = u.length; --l > -1;) o = u[l], (a || o instanceof t || (s = o.target === o.vars.onComplete) && r || n && !s) && o.paused(e)
            };
        return i.pauseAll = function(e, t, n) {
            l(!0, e, t, n)
        }, i.resumeAll = function(e, t, n) {
            l(!1, e, t, n)
        }, o.progress = function(e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }, o.totalProgress = function(e) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
        }, o.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
        }, o.duration = function(t) {
            return arguments.length ? e.prototype.duration.call(this, t) : this._duration
        }, o.totalDuration = function(e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, o.repeat = function(e) {
            return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
        }, o.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
        }, o.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e, this) : this._yoyo
        }, i
    }, !0), window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
        var r = function(e) {
                t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                for (var n, r, s = this.vars, o = i.length; --o > -1;) if (r = s[i[o]]) for (n = r.length; --n > -1;)"{self}" === r[n] && (r = s[i[o]] = r.concat(), r[n] = this);
                s.tweens instanceof Array && this.add(s.tweens, 0, s.align, s.stagger)
            },
            i = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
            s = [],
            o = function(e) {
                var t, n = {};
                for (t in e) n[t] = e[t];
                return n
            },
            u = s.slice,
            a = r.prototype = new t;
        return r.version = "1.9.7", a.constructor = r, a.kill()._gc = !1, a.to = function(e, t, r, i) {
            return t ? this.add(new n(e, t, r), i) : this.set(e, r, i)
        }, a.from = function(e, t, r, i) {
            return this.add(n.from(e, t, r), i)
        }, a.fromTo = function(e, t, r, i, s) {
            return t ? this.add(n.fromTo(e, t, r, i), s) : this.set(e, i, s)
        }, a.staggerTo = function(e, t, i, s, a, f, l, c) {
            var h, p = new r({
                onComplete: f,
                onCompleteParams: l,
                onCompleteScope: c
            });
            for ("string" == typeof e && (e = n.selector(e) || e), !(e instanceof Array) && e.length && e[0] && e[0].nodeType && e[0].style && (e = u.call(e, 0)), s = s || 0, h = 0; e.length > h; h++) i.startAt && (i.startAt = o(i.startAt)), p.to(e[h], t, o(i), h * s);
            return this.add(p, a)
        }, a.staggerFrom = function(e, t, n, r, i, s, o, u) {
            return n.immediateRender = 0 != n.immediateRender, n.runBackwards = !0, this.staggerTo(e, t, n, r, i, s, o, u)
        }, a.staggerFromTo = function(e, t, n, r, i, s, o, u, a) {
            return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, this.staggerTo(e, t, r, i, s, o, u, a)
        }, a.call = function(e, t, r, i) {
            return this.add(n.delayedCall(0, e, t, r), i)
        }, a.set = function(e, t, r) {
            return r = this._parseTimeOrLabel(r, 0, !0), null == t.immediateRender && (t.immediateRender = r === this._time && !this._paused), this.add(new n(e, 0, t), r)
        }, r.exportRoot = function(e, t) {
            e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
            var i, s, o = new r(e),
                u = o._timeline;
            for (null == t && (t = !0), u._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = u._time, i = u._first; i;) s = i._next, t && i instanceof n && i.target === i.vars.onComplete || o.add(i, i._startTime - i._delay), i = s;
            return u.add(o, 0), o
        }, a.add = function(i, s, o, u) {
            var a, f, l, c, h;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, i)), !(i instanceof e)) {
                if (i instanceof Array) {
                    for (o = o || "normal", u = u || 0, a = s, f = i.length, l = 0; f > l; l++)(c = i[l]) instanceof Array && (c = new r({
                        tweens: c
                    })), this.add(c, a), "string" != typeof c && "function" != typeof c && ("sequence" === o ? a = c._startTime + c.totalDuration() / c._timeScale : "start" === o && (c._startTime -= c.delay())), a += u;
                    return this._uncache(!0)
                }
                if ("string" == typeof i) return this.addLabel(i, s);
                if ("function" != typeof i) throw "Cannot add " + i + " into the timeline; it is neither a tween, timeline, function, nor a string.";
                i = n.delayedCall(0, i)
            }
            if (t.prototype.add.call(this, i, s), this._gc && !this._paused && this._time === this._duration && this._time < this.duration()) for (h = this; h._gc && h._timeline;) h._timeline.smoothChildTiming ? h.totalTime(h._totalTime, !0) : h._enabled(!0, !1), h = h._timeline;
            return this
        }, a.remove = function(t) {
            if (t instanceof e) return this._remove(t, !1);
            if (t instanceof Array) {
                for (var n = t.length; --n > -1;) this.remove(t[n]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
        }, a.append = function(e, t) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
        }, a.insert = a.insertMultiple = function(e, t, n, r) {
            return this.add(e, t || 0, n, r)
        }, a.appendMultiple = function(e, t, n, r) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e), n, r)
        }, a.addLabel = function(e, t) {
            return this._labels[e] = this._parseTimeOrLabel(t), this
        }, a.removeLabel = function(e) {
            return delete this._labels[e], this
        }, a.getLabelTime = function(e) {
            return null != this._labels[e] ? this._labels[e] : -1
        }, a._parseTimeOrLabel = function(t, n, r, i) {
            var s;
            if (i instanceof e && i.timeline === this) this.remove(i);
            else if (i instanceof Array) for (s = i.length; --s > -1;) i[s] instanceof e && i[s].timeline === this && this.remove(i[s]);
            if ("string" == typeof n) return this._parseTimeOrLabel(n, r && "number" == typeof t && null == this._labels[n] ? t - this.duration() : 0, r);
            if (n = n || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
            else {
                if (s = t.indexOf("="), -1 === s) return null == this._labels[t] ? r ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
                n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
            }
            return Number(t) + n
        }, a.seek = function(e, t) {
            return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
        }, a.stop = function() {
            return this.paused(!0)
        }, a.gotoAndPlay = function(e, t) {
            return this.play(e, t)
        }, a.gotoAndStop = function(e, t) {
            return this.pause(e, t)
        }, a.render = function(e, t, n) {
            this._gc && this._enabled(!0, !1), this._active = !this._paused;
            var r, i, o, u, a, f = this._dirty ? this.totalDuration() : this._totalDuration,
                l = this._time,
                c = this._startTime,
                h = this._timeScale,
                p = this._paused;
            if (e >= f ? (this._totalTime = this._time = f, this._reversed || this._hasPausedChild() || (i = !0, u = "onComplete", 0 === this._duration && (0 === e || 0 > this._rawPrevTime) && this._rawPrevTime !== e && this._first && (a = !0, this._rawPrevTime > 0 && (u = "onReverseComplete"))), this._rawPrevTime = e, e = f + 1e-6) : 1e-7 > e ? (this._totalTime = this._time = 0, (0 !== l || 0 === this._duration && this._rawPrevTime > 0) && (u = "onReverseComplete", i = this._reversed), 0 > e ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (a = !0)) : this._initted || (a = !0), this._rawPrevTime = e, e = 0) : this._totalTime = this._time = this._rawPrevTime = e, this._time !== l && this._first || n || a) {
                if (this._initted || (this._initted = !0), 0 === l && this.vars.onStart && 0 !== this._time && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s)), this._time >= l) for (r = this._first; r && (o = r._next, !this._paused || p);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
                else for (r = this._last; r && (o = r._prev, !this._paused || p);)(r._active || l >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
                this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s)), u && (this._gc || (c === this._startTime || h !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (i && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[u] && this.vars[u].apply(this.vars[u + "Scope"] || this, this.vars[u + "Params"] || s)))
            }
        }, a._hasPausedChild = function() {
            for (var e = this._first; e;) {
                if (e._paused || e instanceof r && e._hasPausedChild()) return !0;
                e = e._next
            }
            return !1
        }, a.getChildren = function(e, t, r, i) {
            i = i || -9999999999;
            for (var s = [], o = this._first, u = 0; o;) i > o._startTime || (o instanceof n ? t !== !1 && (s[u++] = o) : (r !== !1 && (s[u++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, r)), u = s.length))), o = o._next;
            return s
        }, a.getTweensOf = function(e, t) {
            for (var r = n.getTweensOf(e), i = r.length, s = [], o = 0; --i > -1;)(r[i].timeline === this || t && this._contains(r[i])) && (s[o++] = r[i]);
            return s
        }, a._contains = function(e) {
            for (var t = e.timeline; t;) {
                if (t === this) return !0;
                t = t.timeline
            }
            return !1
        }, a.shiftChildren = function(e, t, n) {
            n = n || 0;
            for (var r, i = this._first, s = this._labels; i;) i._startTime >= n && (i._startTime += e), i = i._next;
            if (t) for (r in s) s[r] >= n && (s[r] += e);
            return this._uncache(!0)
        }, a._kill = function(e, t) {
            if (!e && !t) return this._enabled(!1, !1);
            for (var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), r = n.length, i = !1; --r > -1;) n[r]._kill(e, t) && (i = !0);
            return i
        }, a.clear = function(e) {
            var t = this.getChildren(!1, !0, !0),
                n = t.length;
            for (this._time = this._totalTime = 0; --n > -1;) t[n]._enabled(!1, !1);
            return e !== !1 && (this._labels = {}), this._uncache(!0)
        }, a.invalidate = function() {
            for (var e = this._first; e;) e.invalidate(), e = e._next;
            return this
        }, a._enabled = function(e, n) {
            if (e === this._gc) for (var r = this._first; r;) r._enabled(e, !0), r = r._next;
            return t.prototype._enabled.call(this, e, n)
        }, a.progress = function(e) {
            return arguments.length ? this.totalTime(this.duration() * e, !1) : this._time / this.duration()
        }, a.duration = function(e) {
            return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
        }, a.totalDuration = function(e) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var t, n, r = 0, i = this._last, s = 999999999999; i;) t = i._prev, i._dirty && i.totalDuration(), i._startTime > s && this._sortChildren && !i._paused ? this.add(i, i._startTime - i._delay) : s = i._startTime, 0 > i._startTime && !i._paused && (r -= i._startTime, this._timeline.smoothChildTiming && (this._startTime += i._startTime / this._timeScale), this.shiftChildren(-i._startTime, !1, -9999999999), s = 0), n = i._startTime + i._totalDuration / i._timeScale, n > r && (r = n), i = t;
                    this._duration = this._totalDuration = r, this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== e && this.timeScale(this._totalDuration / e), this
        }, a.usesFrames = function() {
            for (var t = this._timeline; t._timeline;) t = t._timeline;
            return t === e._rootFramesTimeline
        }, a.rawTime = function() {
            return this._paused || 0 !== this._totalTime && this._totalTime !== this._totalDuration ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, r
    }, !0), window._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, n) {
        var r = function(t) {
                e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
            },
            i = [],
            s = new n(null, null, 1, 0),
            o = function(e) {
                for (; e;) {
                    if (e._paused) return !0;
                    e = e._timeline
                }
                return !1
            },
            u = r.prototype = new e;
        return u.constructor = r, u.kill()._gc = !1, r.version = "1.9.7", u.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
        }, u.addCallback = function(e, n, r, i) {
            return this.add(t.delayedCall(0, e, r, i), n)
        }, u.removeCallback = function(e, t) {
            if (null == t) this._kill(null, e);
            else for (var n = this.getTweensOf(e, !1), r = n.length, i = this._parseTimeOrLabel(t); --r > -1;) n[r]._startTime === i && n[r]._enabled(!1, !1);
            return this
        }, u.tweenTo = function(e, n) {
            n = n || {};
            var r, o, u = {
                ease: s,
                overwrite: 2,
                useFrames: this.usesFrames(),
                immediateRender: !1
            };
            for (r in n) u[r] = n[r];
            return u.time = this._parseTimeOrLabel(e), o = new t(this, Math.abs(Number(u.time) - this._time) / this._timeScale || .001, u), u.onStart = function() {
                o.target.paused(!0), o.vars.time !== o.target.time() && o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale), n.onStart && n.onStart.apply(n.onStartScope || o, n.onStartParams || i)
            }, o
        }, u.tweenFromTo = function(e, t, n) {
            n = n || {}, e = this._parseTimeOrLabel(e), n.startAt = {
                onComplete: this.seek,
                onCompleteParams: [e],
                onCompleteScope: this
            }, n.immediateRender = n.immediateRender !== !1;
            var r = this.tweenTo(t, n);
            return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
        }, u.render = function(e, t, n) {
            this._gc && this._enabled(!0, !1), this._active = !this._paused;
            var r, s, o, u, a, f, l = this._dirty ? this.totalDuration() : this._totalDuration,
                c = this._duration,
                h = this._time,
                p = this._totalTime,
                d = this._startTime,
                v = this._timeScale,
                m = this._rawPrevTime,
                g = this._paused,
                y = this._cycle;
            if (e >= l ? (this._locked || (this._totalTime = l, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, u = "onComplete", 0 === c && (0 === e || 0 > this._rawPrevTime) && this._rawPrevTime !== e && this._first && (a = !0, this._rawPrevTime > 0 && (u = "onReverseComplete"))), this._rawPrevTime = e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = c, e = c + 1e-6)) : 1e-7 > e ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== h || 0 === c && this._rawPrevTime > 0 && !this._locked) && (u = "onReverseComplete", s = this._reversed), 0 > e ? (this._active = !1, 0 === c && this._rawPrevTime >= 0 && this._first && (a = !0)) : this._initted || (a = !0), this._rawPrevTime = e, e = 0) : (this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (f = c + this._repeatDelay, this._cycle = this._totalTime / f >> 0, 0 !== this._cycle && this._cycle === this._totalTime / f && this._cycle--, this._time = this._totalTime - this._cycle * f, this._yoyo && 0 !== (1 & this._cycle) && (this._time = c - this._time), this._time > c ? (this._time = c, e = c + 1e-6) : 0 > this._time ? this._time = e = 0 : e = this._time))), this._cycle !== y && !this._locked) {
                var b = this._yoyo && 0 !== (1 & y),
                    w = b === (this._yoyo && 0 !== (1 & this._cycle)),
                    E = this._totalTime,
                    S = this._cycle,
                    x = this._rawPrevTime,
                    T = this._time;
                this._totalTime = y * c, y > this._cycle ? b = !b : this._totalTime += c, this._time = h, this._rawPrevTime = 0 === c ? m - 1e-5 : m, this._cycle = y, this._locked = !0, h = b ? 0 : c, this.render(h, t, 0 === c), t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || i), w && (h = b ? c + 1e-6 : -0.000001, this.render(h, !0, !1)), this._time = T, this._totalTime = E, this._cycle = S, this._rawPrevTime = x, this._locked = !1
            }
            if (!(this._time !== h && this._first || n || a)) return p !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || i)), void 0;
            if (this._initted || (this._initted = !0), 0 === p && this.vars.onStart && 0 !== this._totalTime && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || i)), this._time >= h) for (r = this._first; r && (o = r._next, !this._paused || g);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
            else for (r = this._last; r && (o = r._prev, !this._paused || g);)(r._active || h >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
            this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || i)), u && (this._locked || this._gc || (d === this._startTime || v !== this._timeScale) && (0 === this._time || l >= this.totalDuration()) && (s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[u] && this.vars[u].apply(this.vars[u + "Scope"] || this, this.vars[u + "Params"] || i)))
        }, u.getActive = function(e, t, n) {
            null == e && (e = !0), null == t && (t = !0), null == n && (n = !1);
            var r, i, s = [],
                u = this.getChildren(e, t, n),
                f = 0,
                l = u.length;
            for (r = 0; l > r; r++) i = u[r], i._paused || i._timeline._time >= i._startTime && i._timeline._time < i._startTime + i._totalDuration / i._timeScale && (o(i._timeline) || (s[f++] = i));
            return s
        }, u.getLabelAfter = function(e) {
            e || 0 !== e && (e = this._time);
            var t, n = this.getLabelsArray(),
                r = n.length;
            for (t = 0; r > t; t++) if (n[t].time > e) return n[t].name;
            return null
        }, u.getLabelBefore = function(e) {
            null == e && (e = this._time);
            for (var t = this.getLabelsArray(), n = t.length; --n > -1;) if (e > t[n].time) return t[n].name;
            return null
        }, u.getLabelsArray = function() {
            var e, t = [],
                n = 0;
            for (e in this._labels) t[n++] = {
                time: this._labels[e],
                name: e
            };
            return t.sort(function(e, t) {
                return e.time - t.time
            }), t
        }, u.progress = function(e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }, u.totalProgress = function(e) {
            return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
        }, u.totalDuration = function(t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, u.time = function(e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
        }, u.repeat = function(e) {
            return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
        }, u.repeatDelay = function(e) {
            return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
        }, u.yoyo = function(e) {
            return arguments.length ? (this._yoyo = e, this) : this._yoyo
        }, u.currentLabel = function(e) {
            return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
        }, r
    }, !0), function() {
        var e = 180 / Math.PI,
            t = Math.PI / 180,
            n = [],
            r = [],
            i = [],
            s = {},
            o = function(e, t, n, r) {
                this.a = e, this.b = t, this.c = n, this.d = r, this.da = r - e, this.ca = n - e, this.ba = t - e
            },
            u = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            a = function(e, t, n, r) {
                var i = {
                    a: e
                },
                    s = {},
                    o = {},
                    u = {
                        c: r
                    },
                    a = (e + t) / 2,
                    f = (t + n) / 2,
                    l = (n + r) / 2,
                    c = (a + f) / 2,
                    h = (f + l) / 2,
                    p = (h - c) / 8;
                return i.b = a + (e - a) / 4, s.b = c + p, i.c = s.a = (i.b + s.b) / 2, s.c = o.a = (c + h) / 2, o.b = h - p, u.b = l + (r - l) / 4, o.c = u.a = (o.b + u.b) / 2, [i, s, o, u]
            },
            f = function(e, t, s, o, u) {
                var f, l, c, h, p, d, v, m, g, y, b, w, E, S = e.length - 1,
                    x = 0,
                    T = e[0].a;
                for (f = 0; S > f; f++) p = e[x], l = p.a, c = p.d, h = e[x + 1].d, u ? (b = n[f], w = r[f], E = .25 * (w + b) * t / (o ? .5 : i[f] || .5), d = c - (c - l) * (o ? .5 * t : 0 !== b ? E / b : 0), v = c + (h - c) * (o ? .5 * t : 0 !== w ? E / w : 0), m = c - (d + ((v - d) * (3 * b / (b + w) + .5) / 4 || 0))) : (d = c - .5 * (c - l) * t, v = c + .5 * (h - c) * t, m = c - (d + v) / 2), d += m, v += m, p.c = g = d, p.b = 0 !== f ? T : T = p.a + .6 * (p.c - p.a), p.da = c - l, p.ca = g - l, p.ba = T - l, s ? (y = a(l, T, g, c), e.splice(x, 1, y[0], y[1], y[2], y[3]), x += 4) : x++, T = v;
                p = e[x], p.b = T, p.c = T + .4 * (p.d - T), p.da = p.d - p.a, p.ca = p.c - p.a, p.ba = T - p.a, s && (y = a(p.a, T, p.c, p.d), e.splice(x, 1, y[0], y[1], y[2], y[3]))
            },
            l = function(e, t, i, s) {
                var u, a, f, l, c, h, p = [];
                if (s) for (e = [s].concat(e), a = e.length; --a > -1;)"string" == typeof(h = e[a][t]) && "=" === h.charAt(1) && (e[a][t] = s[t] + Number(h.charAt(0) + h.substr(2)));
                if (u = e.length - 2, 0 > u) return p[0] = new o(e[0][t], 0, 0, e[-1 > u ? 0 : 1][t]), p;
                for (a = 0; u > a; a++) f = e[a][t], l = e[a + 1][t], p[a] = new o(f, 0, 0, l), i && (c = e[a + 2][t], n[a] = (n[a] || 0) + (l - f) * (l - f), r[a] = (r[a] || 0) + (c - l) * (c - l));
                return p[a] = new o(e[a][t], 0, 0, e[a + 1][t]), p
            },
            c = function(e, t, o, a, c, h) {
                var p, d, v, m, g, y, b, w, E = {},
                    S = [],
                    x = h || e[0];
                c = "string" == typeof c ? "," + c + "," : u, null == t && (t = 1);
                for (d in e[0]) S.push(d);
                if (e.length > 1) {
                    for (w = e[e.length - 1], b = !0, p = S.length; --p > -1;) if (d = S[p], Math.abs(x[d] - w[d]) > .05) {
                        b = !1;
                        break
                    }
                    b && (e = e.concat(), h && e.unshift(h), e.push(e[1]), h = e[e.length - 3])
                }
                for (n.length = r.length = i.length = 0, p = S.length; --p > -1;) d = S[p], s[d] = -1 !== c.indexOf("," + d + ","), E[d] = l(e, d, s[d], h);
                for (p = n.length; --p > -1;) n[p] = Math.sqrt(n[p]), r[p] = Math.sqrt(r[p]);
                if (!a) {
                    for (p = S.length; --p > -1;) if (s[d]) for (v = E[S[p]], y = v.length - 1, m = 0; y > m; m++) g = v[m + 1].da / r[m] + v[m].da / n[m], i[m] = (i[m] || 0) + g * g;
                    for (p = i.length; --p > -1;) i[p] = Math.sqrt(i[p])
                }
                for (p = S.length, m = o ? 4 : 1; --p > -1;) d = S[p], v = E[d], f(v, t, o, a, s[d]), b && (v.splice(0, m), v.splice(v.length - m, m));
                return E
            },
            h = function(e, t, n) {
                t = t || "soft";
                var r, i, s, u, a, f, l, c, h, p, d, v = {},
                    m = "cubic" === t ? 3 : 2,
                    g = "soft" === t,
                    y = [];
                if (g && n && (e = [n].concat(e)), null == e || m + 1 > e.length) throw "invalid Bezier data";
                for (h in e[0]) y.push(h);
                for (f = y.length; --f > -1;) {
                    for (h = y[f], v[h] = a = [], p = 0, c = e.length, l = 0; c > l; l++) r = null == n ? e[l][h] : "string" == typeof(d = e[l][h]) && "=" === d.charAt(1) ? n[h] + Number(d.charAt(0) + d.substr(2)) : Number(d), g && l > 1 && c - 1 > l && (a[p++] = (r + a[p - 2]) / 2), a[p++] = r;
                    for (c = p - m + 1, p = 0, l = 0; c > l; l += m) r = a[l], i = a[l + 1], s = a[l + 2], u = 2 === m ? 0 : a[l + 3], a[p++] = d = 3 === m ? new o(r, i, s, u) : new o(r, (2 * i + r) / 3, (2 * i + s) / 3, s);
                    a.length = p
                }
                return v
            },
            p = function(e, t, n) {
                for (var r, i, s, o, u, a, f, l, c, h, p, d = 1 / n, v = e.length; --v > -1;) for (h = e[v], s = h.a, o = h.d - s, u = h.c - s, a = h.b - s, r = i = 0, l = 1; n >= l; l++) f = d * l, c = 1 - f, r = i - (i = (f * f * o + 3 * c * (f * u + c * a)) * f), p = v * n + l - 1, t[p] = (t[p] || 0) + r * r
            },
            d = function(e, t) {
                t = t >> 0 || 6;
                var n, r, i, s, o = [],
                    u = [],
                    a = 0,
                    f = 0,
                    l = t - 1,
                    c = [],
                    h = [];
                for (n in e) p(e[n], o, t);
                for (i = o.length, r = 0; i > r; r++) a += Math.sqrt(o[r]), s = r % t, h[s] = a, s === l && (f += a, s = r / t >> 0, c[s] = h, u[s] = f, a = 0, h = []);
                return {
                    length: f,
                    lengths: u,
                    segments: c
                }
            },
            v = window._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                API: 2,
                global: !0,
                init: function(e, t, n) {
                    this._target = e, t instanceof Array && (t = {
                        values: t
                    }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                    var r, i, s, o, u, a = t.values || [],
                        f = {},
                        l = a[0],
                        p = t.autoRotate || n.vars.orientToBezier;
                    this._autoRotate = p ? p instanceof Array ? p : [
                        ["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]
                    ] : null;
                    for (r in l) this._props.push(r);
                    for (s = this._props.length; --s > -1;) r = this._props[s], this._overwriteProps.push(r), i = this._func[r] = "function" == typeof e[r], f[r] = i ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), u || f[r] !== a[0][r] && (u = f);
                    if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? c(a, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, u) : h(a, t.type, f), this._segCount = this._beziers[r].length, this._timeRes) {
                        var v = d(this._beziers, this._timeRes);
                        this._length = v.length, this._lengths = v.lengths, this._segments = v.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                    }
                    if (p = this._autoRotate) for (p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1;) for (o = 0; 3 > o; o++) r = p[s][o], this._func[r] = "function" == typeof e[r] ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)] : !1;
                    return !0
                },
                set: function(t) {
                    var n, r, i, s, o, u, a, f, l, c, h = this._segCount,
                        p = this._func,
                        d = this._target;
                    if (this._timeRes) {
                        if (l = this._lengths, c = this._curSeg, t *= this._length, i = this._li, t > this._l2 && h - 1 > i) {
                            for (f = h - 1; f > i && t >= (this._l2 = l[++i]););
                            this._l1 = l[i - 1], this._li = i, this._curSeg = c = this._segments[i], this._s2 = c[this._s1 = this._si = 0]
                        } else if (this._l1 > t && i > 0) {
                            for (; i > 0 && (this._l1 = l[--i]) >= t;);
                            0 === i && this._l1 > t ? this._l1 = 0 : i++, this._l2 = l[i], this._li = i, this._curSeg = c = this._segments[i], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                        }
                        if (n = i, t -= this._l1, i = this._si, t > this._s2 && c.length - 1 > i) {
                            for (f = c.length - 1; f > i && t >= (this._s2 = c[++i]););
                            this._s1 = c[i - 1], this._si = i
                        } else if (this._s1 > t && i > 0) {
                            for (; i > 0 && (this._s1 = c[--i]) >= t;);
                            0 === i && this._s1 > t ? this._s1 = 0 : i++, this._s2 = c[i], this._si = i
                        }
                        u = (i + (t - this._s1) / (this._s2 - this._s1)) * this._prec
                    } else n = 0 > t ? 0 : t >= 1 ? h - 1 : h * t >> 0, u = (t - n * (1 / h)) * h;
                    for (r = 1 - u, i = this._props.length; --i > -1;) s = this._props[i], o = this._beziers[s][n], a = (u * u * o.da + 3 * r * (u * o.ca + r * o.ba)) * u + o.a, this._round[s] && (a = a + (a > 0 ? .5 : -0.5) >> 0), p[s] ? d[s](a) : d[s] = a;
                    if (this._autoRotate) {
                        var v, m, g, y, b, w, E, S = this._autoRotate;
                        for (i = S.length; --i > -1;) s = S[i][2], w = S[i][3] || 0, E = S[i][4] === !0 ? 1 : e, o = this._beziers[S[i][0]], v = this._beziers[S[i][1]], o && v && (o = o[n], v = v[n], m = o.a + (o.b - o.a) * u, y = o.b + (o.c - o.b) * u, m += (y - m) * u, y += (o.c + (o.d - o.c) * u - y) * u, g = v.a + (v.b - v.a) * u, b = v.b + (v.c - v.b) * u, g += (b - g) * u, b += (v.c + (v.d - v.c) * u - b) * u, a = Math.atan2(b - g, y - m) * E + w, p[s] ? d[s](a) : d[s] = a)
                    }
                }
            }),
            m = v.prototype;
        v.bezierThrough = c, v.cubicToQuadratic = a, v._autoCSS = !0, v.quadraticToCubic = function(e, t, n) {
            return new o(e, (2 * t + e) / 3, (2 * t + n) / 3, n)
        }, v._cssRegister = function() {
            var e = window._gsDefine.globals.CSSPlugin;
            if (e) {
                var n = e._internals,
                    r = n._parseToProxy,
                    i = n._setPluginRatio,
                    s = n.CSSPropTween;
                n._registerComplexSpecialProp("bezier", {
                    parser: function(e, n, o, u, a, f) {
                        n instanceof Array && (n = {
                            values: n
                        }), f = new v;
                        var l, c, h, p = n.values,
                            d = p.length - 1,
                            m = [],
                            g = {};
                        if (0 > d) return a;
                        for (l = 0; d >= l; l++) h = r(e, p[l], u, a, f, d !== l), m[l] = h.end;
                        for (c in n) g[c] = n[c];
                        return g.values = m, a = new s(e, "bezier", 0, 0, h.pt, 2), a.data = h, a.plugin = f, a.setRatio = i, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (l = g.autoRotate === !0 ? 0 : Number(g.autoRotate) * t, g.autoRotate = null != h.end.left ? [
                            ["left", "top", "rotation", l, !0]
                        ] : null != h.end.x ? [
                            ["x", "y", "rotation", l, !0]
                        ] : !1), g.autoRotate && (u._transform || u._enableTransforms(!1), h.autoRotate = u._target._gsTransform), f._onInitTween(h.proxy, g, u._tween), a
                    }
                })
            }
        }, m._roundProps = function(e, t) {
            for (var n = this._overwriteProps, r = n.length; --r > -1;)(e[n[r]] || e.bezier || e.bezierThrough) && (this._round[n[r]] = t)
        }, m._kill = function(e) {
            var t, n, r = this._props;
            for (t in this._beziers) if (t in e) for (delete this._beziers[t], delete this._func[t], n = r.length; --n > -1;) r[n] === t && r.splice(n, 1);
            return this._super._kill.call(this, e)
        }
    }(), window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
        var n, r, i, s, o = function() {
                e.call(this, "css"), this._overwriteProps.length = 0
            },
            u = {},
            a = o.prototype = new e("css");
        a.constructor = o, o.version = "1.9.7", o.API = 2, o.defaultTransformPerspective = 0, a = "px", o.suffixMap = {
            top: a,
            right: a,
            bottom: a,
            left: a,
            width: a,
            height: a,
            fontSize: a,
            padding: a,
            margin: a,
            perspective: a
        };
        var f, l, c, h, p, d, v = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            y = /[^\d\-\.]/g,
            b = /(?:\d|\-|\+|=|#|\.)*/g,
            w = /opacity *= *([^)]*)/,
            E = /opacity:([^;]*)/,
            S = /alpha\(opacity *=.+?\)/i,
            x = /^(rgb|hsl)/,
            T = /([A-Z])/g,
            N = /-([a-z])/gi,
            C = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            k = function(e, t) {
                return t.toUpperCase()
            },
            L = /(?:Left|Right|Width)/i,
            A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            M = /,(?=[^\)]*(?:\(|$))/gi,
            _ = Math.PI / 180,
            D = 180 / Math.PI,
            P = {},
            H = document,
            B = H.createElement("div"),
            j = H.createElement("img"),
            F = o._internals = {
                _specialProps: u
            },
            I = navigator.userAgent,
            q = function() {
                var e, t = I.indexOf("Android"),
                    n = H.createElement("div");
                return c = -1 !== I.indexOf("Safari") && -1 === I.indexOf("Chrome") && (-1 === t || Number(I.substr(t + 8, 1)) > 3), p = c && 6 > Number(I.substr(I.indexOf("Version/") + 8, 1)), h = -1 !== I.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(I), d = parseFloat(RegExp.$1), n.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", e = n.getElementsByTagName("a")[0], e ? /^0.55/.test(e.style.opacity) : !1
            }(),
            R = function(e) {
                return w.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            U = function(e) {
                window.console && console.log(e)
            },
            z = "",
            W = "",
            X = function(e, t) {
                t = t || B;
                var n, r, i = t.style;
                if (void 0 !== i[e]) return e;
                for (e = e.charAt(0).toUpperCase() + e.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === i[n[r] + e];);
                return r >= 0 ? (W = 3 === r ? "ms" : n[r], z = "-" + W.toLowerCase() + "-", W + e) : null
            },
            V = H.defaultView ? H.defaultView.getComputedStyle : function() {},
            $ = o.getStyle = function(e, t, n, r, i) {
                var s;
                return q || "opacity" !== t ? (!r && e.style[t] ? s = e.style[t] : (n = n || V(e, null)) ? (e = n.getPropertyValue(t.replace(T, "-$1").toLowerCase()), s = e || n.length ? e : n[t]) : e.currentStyle && (n = e.currentStyle, s = n[t]), null == i || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : i) : R(e)
            },
            J = function(e, t, n, r, i) {
                if ("px" === r || !r) return n;
                if ("auto" === r || !n) return 0;
                var s, o = L.test(t),
                    u = e,
                    a = B.style,
                    f = 0 > n;
                return f && (n = -n), "%" === r && -1 !== t.indexOf("border") ? s = n / 100 * (o ? e.clientWidth : e.clientHeight) : (a.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;", "%" !== r && u.appendChild ? a[o ? "borderLeftWidth" : "borderTopWidth"] = n + r : (u = e.parentNode || H.body, a[o ? "width" : "height"] = n + r), u.appendChild(B), s = parseFloat(B[o ? "offsetWidth" : "offsetHeight"]), u.removeChild(B), 0 !== s || i || (s = J(e, t, n, r, !0))), f ? -s : s
            },
            K = function(e, t, n) {
                if ("absolute" !== $(e, "position", n)) return 0;
                var r = "left" === t ? "Left" : "Top",
                    i = $(e, "margin" + r, n);
                return e["offset" + r] - (J(e, t, parseFloat(i), i.replace(b, "")) || 0)
            },
            Q = function(e, t) {
                var n, r, i = {};
                if (t = t || V(e, null)) if (n = t.length) for (; --n > -1;) i[t[n].replace(N, k)] = t.getPropertyValue(t[n]);
                else for (n in t) i[n] = t[n];
                else if (t = e.currentStyle || e.style) for (n in t) i[n.replace(N, k)] = t[n];
                return q || (i.opacity = R(e)), r = xt(e, t, !1), i.rotation = r.rotation * D, i.skewX = r.skewX * D, i.scaleX = r.scaleX, i.scaleY = r.scaleY, i.x = r.x, i.y = r.y, St && (i.z = r.z, i.rotationX = r.rotationX * D, i.rotationY = r.rotationY * D, i.scaleZ = r.scaleZ), i.filters && delete i.filters, i
            },
            G = function(e, t, n, r, i) {
                var s, o, u, a = {},
                    f = e.style;
                for (o in n)"cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = n[o]) || i && i[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (a[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(y, "") ? s : 0 : K(e, o), void 0 !== f[o] && (u = new ct(f, o, f[o], u)));
                if (r) for (o in r)"className" !== o && (a[o] = r[o]);
                return {
                    difs: a,
                    firstMPT: u
                }
            },
            Y = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            Z = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            et = function(e, t, n) {
                var r = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                    i = Y[t],
                    s = i.length;
                for (n = n || V(e, null); --s > -1;) r -= parseFloat($(e, "padding" + i[s], n, !0)) || 0, r -= parseFloat($(e, "border" + i[s] + "Width", n, !0)) || 0;
                return r
            },
            tt = function(e, t) {
                (null == e || "" === e || "auto" === e || "auto auto" === e) && (e = "0 0");
                var n = e.split(" "),
                    r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
                    i = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
                return null == i ? i = "0" : "center" === i && (i = "50%"), ("center" === r || isNaN(parseFloat(r))) && (r = "50%"), t && (t.oxp = -1 !== r.indexOf("%"), t.oyp = -1 !== i.indexOf("%"), t.oxr = "=" === r.charAt(1), t.oyr = "=" === i.charAt(1), t.ox = parseFloat(r.replace(y, "")), t.oy = parseFloat(i.replace(y, ""))), r + " " + i + (n.length > 2 ? " " + n[2] : "")
            },
            nt = function(e, t) {
                return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
            },
            rt = function(e, t) {
                return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) + t : parseFloat(e)
            },
            it = function(e, t, n, r) {
                var i, s, o, u, a = 1e-6;
                return null == e ? u = t : "number" == typeof e ? u = e * _ : (i = 2 * Math.PI, s = e.split("_"), o = Number(s[0].replace(y, "")) * (-1 === e.indexOf("rad") ? _ : 1) - ("=" === e.charAt(1) ? 0 : t), s.length && (r && (r[n] = t + o), -1 !== e.indexOf("short") && (o %= i, o !== o % (i / 2) && (o = 0 > o ? o + i : o - i)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * i) % i - (0 | o / i) * i : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * i) % i - (0 | o / i) * i)), u = t + o), a > u && u > -a && (u = 0), u
            },
            st = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            ot = function(e, t, n) {
                return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 0 | 255 * (1 > 6 * e ? t + 6 * (n - t) * e : .5 > e ? n : 2 > 3 * e ? t + 6 * (n - t) * (2 / 3 - e) : t) + .5
            },
            ut = function(e) {
                var t, n, r, i, s, o;
                return e && "" !== e ? "number" == typeof e ? [e >> 16, 255 & e >> 8, 255 & e] : ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), st[e] ? st[e] : "#" === e.charAt(0) ? (4 === e.length && (t = e.charAt(1), n = e.charAt(2), r = e.charAt(3), e = "#" + t + t + n + n + r + r), e = parseInt(e.substr(1), 16), [e >> 16, 255 & e >> 8, 255 & e]) : "hsl" === e.substr(0, 3) ? (e = e.match(v), i = Number(e[0]) % 360 / 360, s = Number(e[1]) / 100, o = Number(e[2]) / 100, n = .5 >= o ? o * (s + 1) : o + s - o * s, t = 2 * o - n, e.length > 3 && (e[3] = Number(e[3])), e[0] = ot(i + 1 / 3, t, n), e[1] = ot(i, t, n), e[2] = ot(i - 1 / 3, t, n), e) : (e = e.match(v) || st.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e)) : st.black
            },
            at = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (a in st) at += "|" + a + "\\b";
        at = RegExp(at + ")", "gi");
        var ft = function(e, t, n, r) {
                if (null == e) return function(e) {
                    return e
                };
                var i, s = t ? (e.match(at) || [""])[0] : "",
                    o = e.split(s).join("").match(g) || [],
                    u = e.substr(0, e.indexOf(o[0])),
                    a = ")" === e.charAt(e.length - 1) ? ")" : "",
                    f = -1 !== e.indexOf(" ") ? " " : ",",
                    l = o.length,
                    c = l > 0 ? o[0].replace(v, "") : "";
                return l ? i = t ?
                function(e) {
                    var t, h, p, d;
                    if ("number" == typeof e) e += c;
                    else if (r && M.test(e)) {
                        for (d = e.replace(M, "|").split("|"), p = 0; d.length > p; p++) d[p] = i(d[p]);
                        return d.join(",")
                    }
                    if (t = (e.match(at) || [s])[0], h = e.split(t).join("").match(g) || [], p = h.length, l > p--) for (; l > ++p;) h[p] = n ? h[0 | (p - 1) / 2] : o[p];
                    return u + h.join(f) + f + t + a + (-1 !== e.indexOf("inset") ? " inset" : "")
                } : function(e) {
                    var t, s, h;
                    if ("number" == typeof e) e += c;
                    else if (r && M.test(e)) {
                        for (s = e.replace(M, "|").split("|"), h = 0; s.length > h; h++) s[h] = i(s[h]);
                        return s.join(",")
                    }
                    if (t = e.match(g) || [], h = t.length, l > h--) for (; l > ++h;) t[h] = n ? t[0 | (h - 1) / 2] : o[h];
                    return u + t.join(f) + a
                } : function(e) {
                    return e
                }
            },
            lt = function(e) {
                return e = e.split(","), function(t, n, r, i, s, o, u) {
                    var a, f = (n + "").split(" ");
                    for (u = {}, a = 0; 4 > a; a++) u[e[a]] = f[a] = f[a] || f[(a - 1) / 2 >> 0];
                    return i.parse(t, u, s, o)
                }
            },
            ct = (F._setPluginRatio = function(e) {
                this.plugin.setRatio(e);
                for (var t, n, r, i, s = this.data, o = s.proxy, u = s.firstMPT, a = 1e-6; u;) t = o[u.v], u.r ? t = t > 0 ? 0 | t + .5 : 0 | t - .5 : a > t && t > -a && (t = 0), u.t[u.p] = t, u = u._next;
                if (s.autoRotate && (s.autoRotate.rotation = o.rotation), 1 === e) for (u = s.firstMPT; u;) {
                    if (n = u.t, n.type) {
                        if (1 === n.type) {
                            for (i = n.xs0 + n.s + n.xs1, r = 1; n.l > r; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                            n.e = i
                        }
                    } else n.e = n.s + n.xs0;
                    u = u._next
                }
            }, function(e, t, n, r, i) {
                this.t = e, this.p = t, this.v = n, this.r = i, r && (r._prev = this, this._next = r)
            }),
            ht = (F._parseToProxy = function(e, t, n, r, i, s) {
                var o, u, a, f, l, c = r,
                    h = {},
                    p = {},
                    d = n._transform,
                    v = P;
                for (n._transform = null, P = t, r = l = n.parse(e, t, r, i), P = v, s && (n._transform = d, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
                    if (1 >= r.type && (u = r.p, p[u] = r.s + r.c, h[u] = r.s, s || (f = new ct(r, "s", u, f, r.r), r.c = 0), 1 === r.type)) for (o = r.l; --o > 0;) a = "xn" + o, u = r.p + "_" + a, p[u] = r.data[a], h[u] = r[a], s || (f = new ct(r, a, u, f, r.rxp[a]));
                    r = r._next
                }
                return {
                    proxy: h,
                    end: p,
                    firstMPT: f,
                    pt: l
                }
            }, F.CSSPropTween = function(e, t, r, i, o, u, a, f, l, c, h) {
                this.t = e, this.p = t, this.s = r, this.c = i, this.n = a || "css_" + t, e instanceof ht || s.push(this.n), this.r = f, this.type = u || 0, l && (this.pr = l, n = !0), this.b = void 0 === c ? r : c, this.e = void 0 === h ? r + i : h, o && (this._next = o, o._prev = this)
            }),
            pt = o.parseComplex = function(e, t, n, r, i, s, o, u, a, l) {
                n = n || s || "", o = new ht(e, t, 0, 0, o, l ? 2 : 1, null, !1, u, n, r), r += "";
                var c, h, p, d, g, y, b, w, E, S, T, N, C = n.split(", ").join(",").split(" "),
                    k = r.split(", ").join(",").split(" "),
                    L = C.length,
                    A = f !== !1;
                for ((-1 !== r.indexOf(",") || -1 !== n.indexOf(",")) && (C = C.join(" ").replace(M, ", ").split(" "), k = k.join(" ").replace(M, ", ").split(" "), L = C.length), L !== k.length && (C = (s || "").split(" "), L = C.length), o.plugin = a, o.setRatio = l, c = 0; L > c; c++) if (d = C[c], g = k[c], w = parseFloat(d), w || 0 === w) o.appendXtra("", w, nt(g, w), g.replace(m, ""), A && -1 !== g.indexOf("px"), !0);
                else if (i && ("#" === d.charAt(0) || st[d] || x.test(d))) N = "," === g.charAt(g.length - 1) ? ")," : ")", d = ut(d), g = ut(g), E = d.length + g.length > 6, E && !q && 0 === g[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(k[c]).join("transparent")) : (q || (E = !1), o.appendXtra(E ? "rgba(" : "rgb(", d[0], g[0] - d[0], ",", !0, !0).appendXtra("", d[1], g[1] - d[1], ",", !0).appendXtra("", d[2], g[2] - d[2], E ? "," : N, !0), E && (d = 4 > d.length ? 1 : d[3], o.appendXtra("", d, (4 > g.length ? 1 : g[3]) - d, N, !1)));
                else if (y = d.match(v)) {
                    if (b = g.match(m), !b || b.length !== y.length) return o;
                    for (p = 0, h = 0; y.length > h; h++) T = y[h], S = d.indexOf(T, p), o.appendXtra(d.substr(p, S - p), Number(T), nt(b[h], T), "", A && "px" === d.substr(S + T.length, 2), 0 === h), p = S + T.length;
                    o["xs" + o.l] += d.substr(p)
                } else o["xs" + o.l] += o.l ? " " + d : d;
                if (-1 !== r.indexOf("=") && o.data) {
                    for (N = o.xs0 + o.data.s, c = 1; o.l > c; c++) N += o["xs" + c] + o.data["xn" + c];
                    o.e = N + o["xs" + c]
                }
                return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
            },
            dt = 9;
        for (a = ht.prototype, a.l = a.pr = 0; --dt > 0;) a["xn" + dt] = 0, a["xs" + dt] = "";
        a.xs0 = "", a._next = a._prev = a.xfirst = a.data = a.plugin = a.setRatio = a.rxp = null, a.appendXtra = function(e, t, n, r, i, s) {
            var o = this,
                u = o.l;
            return o["xs" + u] += s && u ? " " + e : e || "", n || 0 === u || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = r || "", u > 0 ? (o.data["xn" + u] = t + n, o.rxp["xn" + u] = i, o["xn" + u] = t, o.plugin || (o.xfirst = new ht(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                s: t + n
            }, o.rxp = {}, o.s = t, o.c = n, o.r = i, o)) : (o["xs" + u] += t + (r || ""), o)
        };
        var vt = function(e, t) {
                t = t || {}, this.p = t.prefix ? X(e) || e : e, u[e] = u[this.p] = this, this.format = t.formatter || ft(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
            },
            mt = F._registerComplexSpecialProp = function(e, t, n) {
                "object" != typeof t && (t = {
                    parser: n
                });
                var r, i, s = e.split(","),
                    o = t.defaultValue;
                for (n = n || [o], r = 0; s.length > r; r++) t.prefix = 0 === r && t.prefix, t.defaultValue = n[r] || o, i = new vt(s[r], t)
            },
            gt = function(e) {
                if (!u[e]) {
                    var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                    mt(e, {
                        parser: function(e, n, r, i, s, o, a) {
                            var f = (window.GreenSockGlobals || window).com.greensock.plugins[t];
                            return f ? (f._cssRegister(), u[r].parse(e, n, r, i, s, o, a)) : (U("Error: " + t + " js file not loaded."), s)
                        }
                    })
                }
            };
        a = vt.prototype, a.parseComplex = function(e, t, n, r, i, s) {
            var o, u, a, f, l, c, h = this.keyword;
            if (this.multi && (M.test(n) || M.test(t) ? (u = t.replace(M, "|").split("|"), a = n.replace(M, "|").split("|")) : h && (u = [t], a = [n])), a) {
                for (f = a.length > u.length ? a.length : u.length, o = 0; f > o; o++) t = u[o] = u[o] || this.dflt, n = a[o] = a[o] || this.dflt, h && (l = t.indexOf(h), c = n.indexOf(h), l !== c && (n = -1 === c ? a : u, n[o] += " " + h));
                t = u.join(", "), n = a.join(", ")
            }
            return pt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
        }, a.parse = function(e, t, n, r, s, o) {
            return this.parseComplex(e.style, this.format($(e, this.p, i, !1, this.dflt)), this.format(t), s, o)
        }, o.registerSpecialProp = function(e, t, n) {
            mt(e, {
                parser: function(e, r, i, s, o, u) {
                    var a = new ht(e, i, 0, 0, o, 2, i, !1, n);
                    return a.plugin = u, a.setRatio = t(e, r, s._tween, i), a
                },
                priority: n
            })
        };
        var yt = "scaleX,scaleY,scaleZ,x,y,z,skewX,rotation,rotationX,rotationY,perspective".split(","),
            bt = X("transform"),
            wt = z + "transform",
            Et = X("transformOrigin"),
            St = null !== X("perspective"),
            xt = function(e, t, n) {
                var r, i, s, u, a, f, l, c, h, p, d, v, m, g = n ? e._gsTransform || {
                    skewY: 0
                } : {
                    skewY: 0
                },
                    y = 0 > g.scaleX,
                    b = 2e-5,
                    w = 1e5,
                    E = -Math.PI + 1e-4,
                    S = Math.PI - 1e-4,
                    x = St ? parseFloat($(e, Et, t, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0;
                if (bt) r = $(e, wt, t, !0);
                else if (e.currentStyle) if (r = e.currentStyle.filter.match(A), r && 4 === r.length) r = [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), g.x || 0, g.y || 0].join(",");
                else {
                    if (null != g.x) return g;
                    r = ""
                }
                for (i = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], s = i.length; --s > -1;) u = Number(i[s]), i[s] = (a = u - (u |= 0)) ? (0 | a * w + (0 > a ? -0.5 : .5)) / w + u : u;
                if (16 === i.length) {
                    var T = i[8],
                        N = i[9],
                        C = i[10],
                        k = i[12],
                        L = i[13],
                        O = i[14];
                    if (g.zOrigin && (O = -g.zOrigin, k = T * O - i[12], L = N * O - i[13], O = C * O + g.zOrigin - i[14]), !n || null == g.rotationX) {
                        var M, _, D, P, H, B, j, F = i[0],
                            I = i[1],
                            q = i[2],
                            R = i[3],
                            U = i[4],
                            z = i[5],
                            W = i[6],
                            X = i[7],
                            V = i[11],
                            J = g.rotationX = Math.atan2(W, C),
                            K = E > J || J > S;
                        J && (P = Math.cos(-J), H = Math.sin(-J), M = U * P + T * H, _ = z * P + N * H, D = W * P + C * H, T = U * -H + T * P, N = z * -H + N * P, C = W * -H + C * P, V = X * -H + V * P, U = M, z = _, W = D), J = g.rotationY = Math.atan2(T, F), J && (B = E > J || J > S, P = Math.cos(-J), H = Math.sin(-J), M = F * P - T * H, _ = I * P - N * H, D = q * P - C * H, N = I * H + N * P, C = q * H + C * P, V = R * H + V * P, F = M, I = _, q = D), J = g.rotation = Math.atan2(I, z), J && (j = E > J || J > S, P = Math.cos(-J), H = Math.sin(-J), F = F * P + U * H, _ = I * P + z * H, z = I * -H + z * P, W = q * -H + W * P, I = _), j && K ? g.rotation = g.rotationX = 0 : j && B ? g.rotation = g.rotationY = 0 : B && K && (g.rotationY = g.rotationX = 0), g.scaleX = (0 | Math.sqrt(F * F + I * I) * w + .5) / w, g.scaleY = (0 | Math.sqrt(z * z + N * N) * w + .5) / w, g.scaleZ = (0 | Math.sqrt(W * W + C * C) * w + .5) / w, g.skewX = 0, g.perspective = V ? 1 / (0 > V ? -V : V) : 0, g.x = k, g.y = L, g.z = O
                    }
                } else if (!(St && 0 !== i.length && g.x === i[4] && g.y === i[5] && (g.rotationX || g.rotationY) || void 0 !== g.x && "none" === $(e, "display", t))) {
                    var Q = i.length >= 6,
                        G = Q ? i[0] : 1,
                        Y = i[1] || 0,
                        Z = i[2] || 0,
                        et = Q ? i[3] : 1;
                    g.x = i[4] || 0, g.y = i[5] || 0, f = Math.sqrt(G * G + Y * Y), l = Math.sqrt(et * et + Z * Z), c = G || Y ? Math.atan2(Y, G) : g.rotation || 0, h = Z || et ? Math.atan2(Z, et) + c : g.skewX || 0, p = f - Math.abs(g.scaleX || 0), d = l - Math.abs(g.scaleY || 0), Math.abs(h) > Math.PI / 2 && Math.abs(h) < 1.5 * Math.PI && (y ? (f *= -1, h += 0 >= c ? Math.PI : -Math.PI, c += 0 >= c ? Math.PI : -Math.PI) : (l *= -1, h += 0 >= h ? Math.PI : -Math.PI)), v = (c - g.rotation) % Math.PI, m = (h - g.skewX) % Math.PI, (void 0 === g.skewX || p > b || -b > p || d > b || -b > d || v > E && S > v && !1 | v * w || m > E && S > m && !1 | m * w) && (g.scaleX = f, g.scaleY = l, g.rotation = c, g.skewX = h), St && (g.rotationX = g.rotationY = g.z = 0, g.perspective = parseFloat(o.defaultTransformPerspective) || 0, g.scaleZ = 1)
                }
                g.zOrigin = x;
                for (s in g) b > g[s] && g[s] > -b && (g[s] = 0);
                return n && (e._gsTransform = g), g
            },
            Tt = function(e) {
                var t, n, r = this.data,
                    i = -r.rotation,
                    s = i + r.skewX,
                    o = 1e5,
                    u = (0 | Math.cos(i) * r.scaleX * o) / o,
                    a = (0 | Math.sin(i) * r.scaleX * o) / o,
                    f = (0 | Math.sin(s) * -r.scaleY * o) / o,
                    l = (0 | Math.cos(s) * r.scaleY * o) / o,
                    c = this.t.style,
                    h = this.t.currentStyle;
                if (h) {
                    n = a, a = -f, f = -n, t = h.filter, c.filter = "";
                    var p, v, m = this.t.offsetWidth,
                        g = this.t.offsetHeight,
                        y = "absolute" !== h.position,
                        E = "progid:DXImageTransform.Microsoft.Matrix(M11=" + u + ", M12=" + a + ", M21=" + f + ", M22=" + l,
                        S = r.x,
                        x = r.y;
                    if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, v = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, S += p - (p * u + v * a), x += v - (p * f + v * l)), y) p = m / 2, v = g / 2, E += ", Dx=" + (p - (p * u + v * a) + S) + ", Dy=" + (v - (p * f + v * l) + x) + ")";
                    else {
                        var T, N, C, k = 8 > d ? 1 : -1;
                        for (p = r.ieOffsetX || 0, v = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > u ? -u : u) * m + (0 > a ? -a : a) * g)) / 2 + S), r.ieOffsetY = Math.round((g - ((0 > l ? -l : l) * g + (0 > f ? -f : f) * m)) / 2 + x), dt = 0; 4 > dt; dt++) N = Z[dt], T = h[N], n = -1 !== T.indexOf("px") ? parseFloat(T) : J(this.t, N, parseFloat(T), T.replace(b, "")) || 0, C = n !== r[N] ? 2 > dt ? -r.ieOffsetX : -r.ieOffsetY : 2 > dt ? p - r.ieOffsetX : v - r.ieOffsetY, c[N] = (r[N] = Math.round(n - C * (0 === dt || 2 === dt ? 1 : k))) + "px";
                        E += ", sizingMethod='auto expand')"
                    }
                    c.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(O, E) : E + " " + t, (0 === e || 1 === e) && 1 === u && 0 === a && 0 === f && 1 === l && (y && -1 === E.indexOf("Dx=0, Dy=0") || w.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf("gradient(") && c.removeAttribute("filter"))
                }
            },
            Nt = function() {
                var e, t, n, r, i, s, o, u, a, f = this.data,
                    l = this.t.style,
                    c = f.perspective,
                    p = f.scaleX,
                    d = 0,
                    v = 0,
                    m = 0,
                    g = 0,
                    y = f.scaleY,
                    b = 0,
                    w = 0,
                    E = 0,
                    S = 0,
                    x = f.scaleZ,
                    T = 0,
                    N = 0,
                    C = 0,
                    k = c ? -1 / c : 0,
                    L = f.rotation,
                    A = f.zOrigin,
                    O = 1e5;
                h && (o = l.top ? "top" : l.bottom ? "bottom" : parseFloat($(this.t, "top", null, !1)) ? "bottom" : "top", n = $(this.t, o, null, !1), u = parseFloat(n) || 0, a = n.substr((u + "").length) || "px", f._ffFix = !f._ffFix, l[o] = (f._ffFix ? u + .05 : u - .05) + a), (L || f.skewX) && (n = p * Math.cos(L), r = y * Math.sin(L), L -= f.skewX, d = p * -Math.sin(L), y *= Math.cos(L), p = n, g = r), L = f.rotationY, L && (e = Math.cos(L), t = Math.sin(L), n = p * e, r = g * e, i = x * -t, s = k * -t, v = p * t, b = g * t, x *= e, k *= e, p = n, g = r, E = i, N = s), L = f.rotationX, L && (e = Math.cos(L), t = Math.sin(L), n = d * e + v * t, r = y * e + b * t, i = S * e + x * t, s = C * e + k * t, v = d * -t + v * e, b = y * -t + b * e, x = S * -t + x * e, k = C * -t + k * e, d = n, y = r, S = i, C = s), A && (T -= A, m = v * T, w = b * T, T = x * T + A), m = (n = (m += f.x) - (m |= 0)) ? (0 | n * O + (0 > n ? -0.5 : .5)) / O + m : m, w = (n = (w += f.y) - (w |= 0)) ? (0 | n * O + (0 > n ? -0.5 : .5)) / O + w : w, T = (n = (T += f.z) - (T |= 0)) ? (0 | n * O + (0 > n ? -0.5 : .5)) / O + T : T, l[bt] = "matrix3d(" + [(0 | p * O) / O, (0 | g * O) / O, (0 | E * O) / O, (0 | N * O) / O, (0 | d * O) / O, (0 | y * O) / O, (0 | S * O) / O, (0 | C * O) / O, (0 | v * O) / O, (0 | b * O) / O, (0 | x * O) / O, (0 | k * O) / O, m, w, T, c ? 1 + -T / c : 1].join(",") + ")"
            },
            Ct = function() {
                var e, t, n, r, i, s, o, u, a, f = this.data,
                    l = this.t,
                    c = l.style;
                h && (e = c.top ? "top" : c.bottom ? "bottom" : parseFloat($(l, "top", null, !1)) ? "bottom" : "top", t = $(l, e, null, !1), n = parseFloat(t) || 0, r = t.substr((n + "").length) || "px", f._ffFix = !f._ffFix, c[e] = (f._ffFix ? n + .05 : n - .05) + r), f.rotation || f.skewX ? (i = f.rotation, s = i - f.skewX, o = 1e5, u = f.scaleX * o, a = f.scaleY * o, c[bt] = "matrix(" + (0 | Math.cos(i) * u) / o + "," + (0 | Math.sin(i) * u) / o + "," + (0 | Math.sin(s) * -a) / o + "," + (0 | Math.cos(s) * a) / o + "," + f.x + "," + f.y + ")") : c[bt] = "matrix(" + f.scaleX + ",0,0," + f.scaleY + "," + f.x + "," + f.y + ")"
            };
        mt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation", {
            parser: function(e, t, n, r, s, o, u) {
                if (r._transform) return s;
                var a, f, l, c, h, p, d, v = r._transform = xt(e, i, !0),
                    m = e.style,
                    g = 1e-6,
                    y = yt.length,
                    b = u,
                    w = {};
                if ("string" == typeof b.transform && bt) l = m.cssText, m[bt] = b.transform, m.display = "block", a = xt(e, null, !1), m.cssText = l;
                else if ("object" == typeof b) {
                    if (a = {
                        scaleX: rt(null != b.scaleX ? b.scaleX : b.scale, v.scaleX),
                        scaleY: rt(null != b.scaleY ? b.scaleY : b.scale, v.scaleY),
                        scaleZ: rt(null != b.scaleZ ? b.scaleZ : b.scale, v.scaleZ),
                        x: rt(b.x, v.x),
                        y: rt(b.y, v.y),
                        z: rt(b.z, v.z),
                        perspective: rt(b.transformPerspective, v.perspective)
                    }, d = b.directionalRotation, null != d) if ("object" == typeof d) for (l in d) b[l] = d[l];
                    else b.rotation = d;
                    a.rotation = it("rotation" in b ? b.rotation : "shortRotation" in b ? b.shortRotation + "_short" : "rotationZ" in b ? b.rotationZ : v.rotation * D, v.rotation, "rotation", w), St && (a.rotationX = it("rotationX" in b ? b.rotationX : "shortRotationX" in b ? b.shortRotationX + "_short" : v.rotationX * D || 0, v.rotationX, "rotationX", w), a.rotationY = it("rotationY" in b ? b.rotationY : "shortRotationY" in b ? b.shortRotationY + "_short" : v.rotationY * D || 0, v.rotationY, "rotationY", w)), a.skewX = null == b.skewX ? v.skewX : it(b.skewX, v.skewX), a.skewY = null == b.skewY ? v.skewY : it(b.skewY, v.skewY), (f = a.skewY - v.skewY) && (a.skewX += f, a.rotation += f)
                }
                for (h = v.z || v.rotationX || v.rotationY || a.z || a.rotationX || a.rotationY || a.perspective, h || null == b.scale || (a.scaleZ = 1); --y > -1;) n = yt[y], c = a[n] - v[n], (c > g || -g > c || null != P[n]) && (p = !0, s = new ht(v, n, v[n], c, s), n in w && (s.e = w[n]), s.xs0 = 0, s.plugin = o, r._overwriteProps.push(s.n));
                return c = b.transformOrigin, (c || St && h && v.zOrigin) && (bt ? (p = !0, c = (c || $(e, n, i, !1, "50% 50%")) + "", n = Et, s = new ht(m, n, 0, 0, s, -1, "css_transformOrigin"), s.b = m[n], s.plugin = o, St ? (l = v.zOrigin, c = c.split(" "), v.zOrigin = (c.length > 2 ? parseFloat(c[2]) : l) || 0, s.xs0 = s.e = m[n] = c[0] + " " + (c[1] || "50%") + " 0px", s = new ht(v, "zOrigin", 0, 0, s, -1, s.n), s.b = l, s.xs0 = s.e = v.zOrigin) : s.xs0 = s.e = m[n] = c) : tt(c + "", v)), p && (r._transformType = h || 3 === this._transformType ? 3 : 2), s
            },
            prefix: !0
        }), mt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), mt("borderRadius", {
            defaultValue: "0px",
            parser: function(e, t, n, s, o) {
                t = this.format(t);
                var u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    T = e.style;
                for (v = parseFloat(e.offsetWidth), m = parseFloat(e.offsetHeight), u = t.split(" "), a = 0; x.length > a; a++) this.p.indexOf("border") && (x[a] = X(x[a])), c = l = $(e, x[a], i, !1, "0px"), -1 !== c.indexOf(" ") && (l = c.split(" "), c = l[0], l = l[1]), h = f = u[a], p = parseFloat(c), y = c.substr((p + "").length), b = "=" === h.charAt(1), b ? (d = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), d *= parseFloat(h), g = h.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(h), g = h.substr((d + "").length)), "" === g && (g = r[n] || y), g !== y && (w = J(e, "borderLeft", p, y), E = J(e, "borderTop", p, y), "%" === g ? (c = 100 * (w / v) + "%", l = 100 * (E / m) + "%") : "em" === g ? (S = J(e, "borderLeft", 1, "em"), c = w / S + "em", l = E / S + "em") : (c = w + "px", l = E + "px"), b && (h = parseFloat(c) + d + g, f = parseFloat(l) + d + g)), o = pt(T, x[a], c + " " + l, h + " " + f, !1, "0px", o);
                return o
            },
            prefix: !0,
            formatter: ft("0px 0px 0px 0px", !1, !0)
        }), mt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(e, t, n, r, s, o) {
                var u, a, f, l, c, h, p = "background-position",
                    v = i || V(e, null),
                    m = this.format((v ? d ? v.getPropertyValue(p + "-x") + " " + v.getPropertyValue(p + "-y") : v.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                    g = this.format(t);
                if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (h = $(e, "backgroundImage").replace(C, ""), h && "none" !== h)) {
                    for (u = m.split(" "), a = g.split(" "), j.setAttribute("src", h), f = 2; --f > -1;) m = u[f], l = -1 !== m.indexOf("%"), l !== (-1 !== a[f].indexOf("%")) && (c = 0 === f ? e.offsetWidth - j.width : e.offsetHeight - j.height, u[f] = l ? parseFloat(m) / 100 * c + "px" : 100 * (parseFloat(m) / c) + "%");
                    m = u.join(" ")
                }
                return this.parseComplex(e.style, m, g, s, o)
            },
            formatter: tt
        }), mt("backgroundSize", {
            defaultValue: "0 0",
            formatter: tt
        }), mt("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), mt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), mt("transformStyle", {
            prefix: !0
        }), mt("backfaceVisibility", {
            prefix: !0
        }), mt("margin", {
            parser: lt("marginTop,marginRight,marginBottom,marginLeft")
        }), mt("padding", {
            parser: lt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }), mt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(e, t, n, r, s, o) {
                var u, a, f;
                return 9 > d ? (a = e.currentStyle, f = 8 > d ? " " : ",", u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")", t = this.format(t).split(",").join(f)) : (u = this.format($(e, this.p, i, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, u, t, s, o)
            }
        }), mt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), mt("autoRound,strictUnits", {
            parser: function(e, t, n, r, i) {
                return i
            }
        }), mt("border", {
            defaultValue: "0px solid #000",
            parser: function(e, t, n, r, s, o) {
                return this.parseComplex(e.style, this.format($(e, "borderTopWidth", i, !1, "0px") + " " + $(e, "borderTopStyle", i, !1, "solid") + " " + $(e, "borderTopColor", i, !1, "#000")), this.format(t), s, o)
            },
            color: !0,
            formatter: function(e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(at) || ["#000"])[0]
            }
        }), mt("float,cssFloat,styleFloat", {
            parser: function(e, t, n, r, i) {
                var s = e.style,
                    o = "cssFloat" in s ? "cssFloat" : "styleFloat";
                return new ht(s, o, 0, 0, i, -1, n, !1, 0, s[o], t)
            }
        });
        var kt = function(e) {
                var t, n = this.t,
                    r = n.filter,
                    i = 0 | this.s + this.c * e;
                100 === i && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") ? (n.removeAttribute("filter"), t = !$(this.data, "filter")) : (n.filter = r.replace(S, ""), t = !0)), t || (this.xn1 && (n.filter = r = r || "alpha(opacity=100)"), -1 === r.indexOf("opacity") ? n.filter += " alpha(opacity=" + i + ")" : n.filter = r.replace(w, "opacity=" + i))
            };
        mt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(e, t, n, r, s, o) {
                var u, a = parseFloat($(e, "opacity", i, !1, "1")),
                    f = e.style;
                return t = parseFloat(t), "autoAlpha" === n && (u = $(e, "visibility", i), 1 === a && "hidden" === u && 0 !== t && (a = 0), s = new ht(f, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "visible" : "hidden", 0 === t ? "hidden" : "visible"), s.xs0 = "visible", r._overwriteProps.push(s.n)), q ? s = new ht(f, "opacity", a, t - a, s) : (s = new ht(f, "opacity", 100 * a, 100 * (t - a), s), s.xn1 = "autoAlpha" === n ? 1 : 0, f.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = kt), s
            }
        });
        var Lt = function(e, t) {
                t && (e.removeProperty ? e.removeProperty(t.replace(T, "-$1").toLowerCase()) : e.removeAttribute(t))
            },
            At = function(e) {
                if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                    this.t.className = 0 === e ? this.b : this.e;
                    for (var t = this.data, n = this.t.style; t;) t.v ? n[t.p] = t.v : Lt(n, t.p), t = t._next;
                    1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                } else this.t.className !== this.e && (this.t.className = this.e)
            };
        mt("className", {
            parser: function(e, t, r, s, o, u, a) {
                var f, l, c, h, p, d = e.className,
                    v = e.style.cssText;
                if (o = s._classNamePT = new ht(e, r, 0, 0, o, 2), o.setRatio = At, o.pr = -11, n = !0, o.b = d, l = Q(e, i), c = e._gsClassPT) {
                    for (h = {}, p = c.data; p;) h[p.p] = 1, p = p._next;
                    c.setRatio(1)
                }
                return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : d.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), s._tween._duration && (e.className = o.e, f = G(e, l, Q(e), a, h), e.className = d, o.data = f.firstMPT, e.style.cssText = v, o = o.xfirst = s.parse(e, f.difs, o, u)), o
            }
        });
        var Ot = function(e) {
                if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration) for (var t, n = "all" === this.e, r = this.t.style, i = n ? r.cssText.split(";") : this.e.split(","), s = i.length, o = u.transform.parse; --s > -1;) t = i[s], n && (t = t.substr(0, t.indexOf(":")).split(" ").join("")), u[t] && (t = u[t].parse === o ? bt : u[t].p), Lt(r, t)
            };
        for (mt("clearProps", {
            parser: function(e, t, r, i, s) {
                return s = new ht(e, r, 0, 0, s, 2), s.setRatio = Ot, s.e = t, s.pr = -10, s.data = i._tween, n = !0, s
            }
        }), a = "bezier,throwProps,physicsProps,physics2D".split(","), dt = a.length; dt--;) gt(a[dt]);
        a = o.prototype, a._firstPT = null, a._onInitTween = function(e, t, u) {
            if (!e.nodeType) return !1;
            this._target = e, this._tween = u, this._vars = t, f = t.autoRound, n = !1, r = t.suffixMap || o.suffixMap, i = V(e, ""), s = this._overwriteProps;
            var a, h, d, v, m, g, y, b, w, S = e.style;
            if (l && "" === S.zIndex && (a = $(e, "zIndex", i), ("auto" === a || "" === a) && (S.zIndex = 0)), "string" == typeof t && (v = S.cssText, a = Q(e, i), S.cssText = v + ";" + t, a = G(e, a, Q(e)).difs, !q && E.test(t) && (a.opacity = parseFloat(RegExp.$1)), t = a, S.cssText = v), this._firstPT = h = this.parse(e, t, null), this._transformType) {
                for (w = 3 === this._transformType, bt ? c && (l = !0, "" === S.zIndex && (y = $(e, "zIndex", i), ("auto" === y || "" === y) && (S.zIndex = 0)), p && (S.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : S.zoom = 1, d = h; d && d._next;) d = d._next;
                b = new ht(e, "transform", 0, 0, null, 2), this._linkCSSP(b, null, d), b.setRatio = w && St ? Nt : bt ? Ct : Tt, b.data = this._transform || xt(e, i, !0), s.pop()
            }
            if (n) {
                for (; h;) {
                    for (g = h._next, d = v; d && d.pr > h.pr;) d = d._next;
                    (h._prev = d ? d._prev : m) ? h._prev._next = h : v = h, (h._next = d) ? d._prev = h : m = h, h = g
                }
                this._firstPT = v
            }
            return !0
        }, a.parse = function(e, t, n, s) {
            var o, a, l, c, h, p, d, v, m, g, y = e.style;
            for (o in t) p = t[o], a = u[o], a ? n = a.parse(e, p, o, this, n, s, t) : (h = $(e, o, i) + "", m = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || m && x.test(p) ? (m || (p = ut(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = pt(y, o, h, p, !0, "transparent", n, 0, s)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (l = parseFloat(h), d = l || 0 === l ? h.substr((l + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (l = et(e, o, i), d = "px") : "left" === o || "top" === o ? (l = K(e, o, i), d = "px") : (l = "opacity" !== o ? 0 : 1, d = "")), g = m && "=" === p.charAt(1), g ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), v = p.replace(b, "")) : (c = parseFloat(p), v = m ? p.substr((c + "").length) || "" : ""), "" === v && (v = r[o] || d), p = c || 0 === c ? (g ? c + l : c) + v : t[o], d !== v && "" !== v && (c || 0 === c) && (l || 0 === l) && (l = J(e, o, l, d), "%" === v ? (l /= J(e, o, 100, "%") / 100, l > 100 && (l = 100), t.strictUnits !== !0 && (h = l + "%")) : "em" === v ? l /= J(e, o, 1, "em") : (c = J(e, o, c, v), v = "px"), g && (c || 0 === c) && (p = c + l + v)), g && (c += l), !l && 0 !== l || !c && 0 !== c ? void 0 !== y[o] && (p || "NaN" != p + "" && null != p) ? (n = new ht(y, o, c || l || 0, 0, n, -1, "css_" + o, !1, 0, h, p), n.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : U("invalid " + o + " tween value: " + t[o]) : (n = new ht(y, o, l, c - l, n, 0, "css_" + o, f !== !1 && ("px" === v || "zIndex" === o), 0, h, p), n.xs0 = v)) : n = pt(y, o, h, p, !0, null, n, 0, s)), s && n && !n.plugin && (n.plugin = s);
            return n
        }, a.setRatio = function(e) {
            var t, n, r, i = this._firstPT,
                s = 1e-6;
            if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -0.000001) for (; i;) {
                if (t = i.c * e + i.s, i.r ? t = t > 0 ? 0 | t + .5 : 0 | t - .5 : s > t && t > -s && (t = 0), i.type) if (1 === i.type) if (r = i.l, 2 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2;
                else if (3 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
                else if (4 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4;
                else if (5 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4 + i.xn4 + i.xs5;
                else {
                    for (n = i.xs0 + t + i.xs1, r = 1; i.l > r; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                    i.t[i.p] = n
                } else - 1 === i.type ? i.t[i.p] = i.xs0 : i.setRatio && i.setRatio(e);
                else i.t[i.p] = t + i.xs0;
                i = i._next
            } else for (; i;) 2 !== i.type ? i.t[i.p] = i.b : i.setRatio(e), i = i._next;
            else for (; i;) 2 !== i.type ? i.t[i.p] = i.e : i.setRatio(e), i = i._next
        }, a._enableTransforms = function(e) {
            this._transformType = e || 3 === this._transformType ? 3 : 2
        }, a._linkCSSP = function(e, t, n, r) {
            return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), n ? n._next = e : r || null !== this._firstPT || (this._firstPT = e), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next), e._next = t, e._prev = n), e
        }, a._kill = function(t) {
            var n, r, i, s = t;
            if (t.css_autoAlpha || t.css_alpha) {
                s = {};
                for (r in t) s[r] = t[r];
                s.css_opacity = 1, s.css_autoAlpha && (s.css_visibility = 1)
            }
            return t.css_className && (n = this._classNamePT) && (i = n.xfirst, i && i._prev ? this._linkCSSP(i._prev, n._next, i._prev._prev) : i === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, i._prev), this._classNamePT = null), e.prototype._kill.call(this, s)
        };
        var Mt = function(e, t, n) {
                var r, i, s, o;
                if (e.slice) for (i = e.length; --i > -1;) Mt(e[i], t, n);
                else for (r = e.childNodes, i = r.length; --i > -1;) s = r[i], o = s.type, s.style && (t.push(Q(s)), n && n.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Mt(s, t, n)
            };
        return o.cascadeTo = function(e, n, r) {
            var i, s, o, u = t.to(e, n, r),
                a = [u],
                f = [],
                l = [],
                c = [],
                h = t._internals.reservedProps;
            for (e = u._targets || u.target, Mt(e, f, c), u.render(n, !0), Mt(e, l), u.render(0, !0), u._enabled(!0), i = c.length; --i > -1;) if (s = G(c[i], f[i], l[i]), s.firstMPT) {
                s = s.difs;
                for (o in r) h[o] && (s[o] = r[o]);
                a.push(t.to(c[i], n, s))
            }
            return a
        }, e.activate([o]), o
    }, !0), function() {
        var e = window._gsDefine.plugin({
            propName: "roundProps",
            priority: -1,
            API: 2,
            init: function(e, t, n) {
                return this._tween = n, !0
            }
        }),
            t = e.prototype;
        t._onInitAllProps = function() {
            for (var e, t, n, r = this._tween, i = r.vars.roundProps instanceof Array ? r.vars.roundProps : r.vars.roundProps.split(","), s = i.length, o = {}, u = r._propLookup.roundProps; --s > -1;) o[i[s]] = 1;
            for (s = i.length; --s > -1;) for (e = i[s], t = r._firstPT; t;) n = t._next, t.pg ? t.t._roundProps(o, !0) : t.n === e && (this._add(t.t, e, t.s, t.c), n && (n._prev = t._prev), t._prev ? t._prev._next = n : r._firstPT === t && (r._firstPT = n), t._next = t._prev = null, r._propLookup[e] = u), t = n;
            return !1
        }, t._add = function(e, t, n, r) {
            this._addTween(e, t, n, n + r, t, !0), this._overwriteProps.push(t)
        }
    }(), window._gsDefine.plugin({
        propName: "attr",
        API: 2,
        init: function(e, t) {
            var n;
            if ("function" != typeof e.setAttribute) return !1;
            this._target = e, this._proxy = {};
            for (n in t) this._addTween(this._proxy, n, parseFloat(e.getAttribute(n)), t[n], n), this._overwriteProps.push(n);
            return !0
        },
        set: function(e) {
            this._super.setRatio.call(this, e);
            for (var t, n = this._overwriteProps, r = n.length; --r > -1;) t = n[r], this._target.setAttribute(t, this._proxy[t] + "")
        }
    }), window._gsDefine.plugin({
        propName: "directionalRotation",
        API: 2,
        init: function(e, t) {
            "object" != typeof t && (t = {
                rotation: t
            }), this.finals = {};
            var n, r, i, s, o, u, a = t.useRadians === !0 ? 2 * Math.PI : 360,
                f = 1e-6;
            for (n in t)"useRadians" !== n && (u = (t[n] + "").split("_"), r = u[0], i = parseFloat("function" != typeof e[n] ? e[n] : e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]()), s = this.finals[n] = "string" == typeof r && "=" === r.charAt(1) ? i + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0, o = s - i, u.length && (r = u.join("_"), -1 !== r.indexOf("short") && (o %= a, o !== o % (a / 2) && (o = 0 > o ? o + a : o - a)), -1 !== r.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * a) % a - (0 | o / a) * a : -1 !== r.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * a) % a - (0 | o / a) * a)), (o > f || -f > o) && (this._addTween(e, n, i, i + o, n), this._overwriteProps.push(n)));
            return !0
        },
        set: function(e) {
            var t;
            if (1 !== e) this._super.setRatio.call(this, e);
            else for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p], t = t._next
        }
    })._autoCSS = !0, window._gsDefine("easing.Back", ["easing.Ease"], function(e) {
        var t, n, r, i = window.GreenSockGlobals || window,
            s = i.com.greensock,
            o = 2 * Math.PI,
            u = Math.PI / 2,
            a = s._class,
            f = function(t, n) {
                var r = a("easing." + t, function() {}, !0),
                    i = r.prototype = new e;
                return i.constructor = r, i.getRatio = n, r
            },
            l = e.register ||
        function() {}, c = function(e, t, n, r) {
            var i = a("easing." + e, {
                easeOut: new t,
                easeIn: new n,
                easeInOut: new r
            }, !0);
            return l(i, e), i
        }, h = function(e, t, n) {
            this.t = e, this.v = t, n && (this.next = n, n.prev = this, this.c = n.v - t, this.gap = n.t - e)
        }, p = function(t, n) {
            var r = a("easing." + t, function(e) {
                this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
            }, !0),
                i = r.prototype = new e;
            return i.constructor = r, i.getRatio = n, i.config = function(e) {
                return new r(e)
            }, r
        }, d = c("Back", p("BackOut", function(
        e) {
            return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
        }), p("BackIn", function(e) {
            return e * e * ((this._p1 + 1) * e - this._p1)
        }), p("BackInOut", function(e) {
            return 1 > (e *= 2) ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
        })), v = a("easing.SlowMo", function(e, t, n) {
            t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = n === !0
        }, !0), m = v.prototype = new e;
        return m.constructor = v, m.getRatio = function(e) {
            var t = e + (.5 - e) * this._p;
            return this._p1 > e ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
        }, v.ease = new v(.7, .7), m.config = v.config = function(e, t, n) {
            return new v(e, t, n)
        }, t = a("easing.SteppedEase", function(e) {
            e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
        }, !0), m = t.prototype = new e, m.constructor = t, m.getRatio = function(e) {
            return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
        }, m.config = t.config = function(e) {
            return new t(e)
        }, n = a("easing.RoughEase", function(t) {
            t = t || {};
            for (var n, r, i, s, o, u, a = t.taper || "none", f = [], l = 0, c = 0 | (t.points || 20), p = c, d = t.randomize !== !1, v = t.clamp === !0, m = t.template instanceof e ? t.template : null, g = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1;) n = d ? Math.random() : 1 / c * p, r = m ? m.getRatio(n) : n, "none" === a ? i = g : "out" === a ? (s = 1 - n, i = s * s * g) : "in" === a ? i = n * n * g : .5 > n ? (s = 2 * n, i = .5 * s * s * g) : (s = 2 * (1 - n), i = .5 * s * s * g), d ? r += Math.random() * i - .5 * i : p % 2 ? r += .5 * i : r -= .5 * i, v && (r > 1 ? r = 1 : 0 > r && (r = 0)), f[l++] = {
                x: n,
                y: r
            };
            for (f.sort(function(e, t) {
                return e.x - t.x
            }), u = new h(1, 1, null), p = c; --p > -1;) o = f[p], u = new h(o.x, o.y, u);
            this._prev = new h(0, 0, 0 !== u.t ? u : u.next)
        }, !0), m = n.prototype = new e, m.constructor = n, m.getRatio = function(e) {
            var t = this._prev;
            if (e > t.t) {
                for (; t.next && e >= t.t;) t = t.next;
                t = t.prev
            } else for (; t.prev && t.t >= e;) t = t.prev;
            return this._prev = t, t.v + (e - t.t) / t.gap * t.c
        }, m.config = function(e) {
            return new n(e)
        }, n.ease = new n, c("Bounce", f("BounceOut", function(e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), f("BounceIn", function(e) {
            return 1 / 2.75 > (e = 1 - e) ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), f("BounceInOut", function(e) {
            var t = .5 > e;
            return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
        })), c("Circ", f("CircOut", function(e) {
            return Math.sqrt(1 - (e -= 1) * e)
        }), f("CircIn", function(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }), f("CircInOut", function(e) {
            return 1 > (e *= 2) ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        })), r = function(t, n, r) {
            var i = a("easing." + t, function(e, t) {
                this._p1 = e || 1, this._p2 = t || r, this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0)
            }, !0),
                s = i.prototype = new e;
            return s.constructor = i, s.getRatio = n, s.config = function(e, t) {
                return new i(e, t)
            }, i
        }, c("Elastic", r("ElasticOut", function(e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * o / this._p2) + 1
        }, .3), r("ElasticIn", function(e) {
            return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2))
        }, .3), r("ElasticInOut", function(e) {
            return 1 > (e *= 2) ? -0.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2) + 1
        }, .45)), c("Expo", f("ExpoOut", function(e) {
            return 1 - Math.pow(2, -10 * e)
        }), f("ExpoIn", function(e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), f("ExpoInOut", function(e) {
            return 1 > (e *= 2) ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        })), c("Sine", f("SineOut", function(e) {
            return Math.sin(e * u)
        }), f("SineIn", function(e) {
            return -Math.cos(e * u) + 1
        }), f("SineInOut", function(e) {
            return -0.5 * (Math.cos(Math.PI * e) - 1)
        })), a("easing.EaseLookup", {
            find: function(t) {
                return e.map[t]
            }
        }, !0), l(i.SlowMo, "SlowMo", "ease,"), l(n, "RoughEase", "ease,"), l(t, "SteppedEase", "ease,"), d
    }, !0)
}), function(e) {
    "use strict";
    var t, n, r, i, s, o = e.GreenSockGlobals || e,
        u = function(e) {
            var t, n = e.split("."),
                r = o;
            for (t = 0; n.length > t; t++) r[n[t]] = r = r[n[t]] || {};
            return r
        },
        a = u("com.greensock"),
        f = [].slice,
        l = function() {},
        c = {},
        h = function(t, n, r, i) {
            this.sc = c[t] ? c[t].sc : [], c[t] = this, this.gsClass = null, this.func = r;
            var s = [];
            this.check = function(a) {
                for (var f, l, p, d, v = n.length, m = v; --v > -1;)(f = c[n[v]] || new h(n[v], [])).gsClass ? (s[v] = f.gsClass, m--) : a && f.sc.push(this);
                if (0 === m && r) for (l = ("com.greensock." + t).split("."), p = l.pop(), d = u(l.join("."))[p] = this.gsClass = r.apply(r, s), i && (o[p] = d, "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + t.split(".").join("/"), [], function() {
                    return d
                }) : "undefined" != typeof module && module.exports && (module.exports = d)), v = 0; this.sc.length > v; v++) this.sc[v].check()
            }, this.check(!0)
        },
        p = e._gsDefine = function(e, t, n, r) {
            return new h(e, t, n, r)
        },
        d = a._class = function(e, t, n) {
            return t = t ||
            function() {}, p(e, [], function() {
                return t
            }, n), t
        };
    p.globals = o;
    var v = [0, 0, 1, 1],
        m = [],
        g = d("easing.Ease", function(e, t, n, r) {
            this._func = e, this._type = n || 0, this._power = r || 0, this._params = t ? v.concat(t) : v
        }, !0),
        y = g.map = {},
        b = g.register = function(e, t, n, r) {
            for (var i, s, o, u, f = t.split(","), l = f.length, c = (n || "easeIn,easeOut,easeInOut").split(","); --l > -1;) for (s = f[l], i = r ? d("easing." + s, null, !0) : a.easing[s] || {}, o = c.length; --o > -1;) u = c[o], y[s + "." + u] = y[u + s] = i[u] = e.getRatio ? e : e[u] || new e
        };
    for (r = g.prototype, r._calcEnd = !1, r.getRatio = function(e) {
        if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
        var t = this._type,
            n = this._power,
            r = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
        return 1 === n ? r *= r : 2 === n ? r *= r * r : 3 === n ? r *= r * r * r : 4 === n && (r *= r * r * r * r), 1 === t ? 1 - r : 2 === t ? r : .5 > e ? r / 2 : 1 - r / 2
    }, t = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = t.length; --n > -1;) r = t[n] + ",Power" + n, b(new g(null, null, 1, n), r, "easeOut", !0), b(new g(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), b(new g(null, null, 3, n), r, "easeInOut");
    y.linear = a.easing.Linear.easeIn, y.swing = a.easing.Quad.easeInOut;
    var w = d("events.EventDispatcher", function(e) {
        this._listeners = {}, this._eventTarget = e || this
    });
    r = w.prototype, r.addEventListener = function(e, t, n, r, o) {
        o = o || 0;
        var u, a, f = this._listeners[e],
            l = 0;
        for (null == f && (this._listeners[e] = f = []), a = f.length; --a > -1;) u = f[a], u.c === t && u.s === n ? f.splice(a, 1) : 0 === l && o > u.pr && (l = a + 1);
        f.splice(l, 0, {
            c: t,
            s: n,
            up: r,
            pr: o
        }), this !== i || s || i.wake()
    }, r.removeEventListener = function(e, t) {
        var n, r = this._listeners[e];
        if (r) for (n = r.length; --n > -1;) if (r[n].c === t) return r.splice(n, 1), void 0
    }, r.dispatchEvent = function(e) {
        var t, n, r, i = this._listeners[e];
        if (i) for (t = i.length, n = this._eventTarget; --t > -1;) r = i[t], r.up ? r.c.call(r.s || n, {
            type: e,
            target: n
        }) : r.c.call(r.s || n)
    };
    var E = e.requestAnimationFrame,
        S = e.cancelAnimationFrame,
        x = Date.now ||
    function() {
        return (new Date).getTime()
    };
    for (t = ["ms", "moz", "webkit", "o"], n = t.length; --n > -1 && !E;) E = e[t[n] + "RequestAnimationFrame"], S = e[t[n] + "CancelAnimationFrame"] || e[t[n] + "CancelRequestAnimationFrame"];
    d("Ticker", function(e, t) {
        var n, r, o, u, a, f = this,
            c = x(),
            h = t !== !1 && E,
            p = function(e) {
                f.time = (x() - c) / 1e3;
                var t = o,
                    i = f.time - a;
                (!n || i > 0 || e === !0) && (f.frame++, a += i + (i >= u ? .004 : u - i), f.dispatchEvent("tick")), e !== !0 && t === o && (o = r(p))
            };
        w.call(f), this.time = this.frame = 0, this.tick = function() {
            p(!0)
        }, this.sleep = function() {
            null != o && (h && S ? S(o) : clearTimeout(o), r = l, o = null, f === i && (s = !1))
        }, this.wake = function() {
            null !== o && f.sleep(), r = 0 === n ? l : h && E ? E : function(e) {
                return setTimeout(e, 0 | 1e3 * (a - f.time) + 1)
            }, f === i && (s = !0), p(2)
        }, this.fps = function(e) {
            return arguments.length ? (n = e, u = 1 / (n || 60), a = this.time + u, f.wake(), void 0) : n
        }, this.useRAF = function(e) {
            return arguments.length ? (f.sleep(), h = e, f.fps(n), void 0) : h
        }, f.fps(e), setTimeout(function() {
            h && (!o || 5 > f.frame) && f.useRAF(!1)
        }, 1500)
    }), r = a.Ticker.prototype = new a.events.EventDispatcher, r.constructor = a.Ticker;
    var T = d("core.Animation", function(e, t) {
        if (this.vars = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(this.vars.delay) || 0, this._timeScale = 1, this._active = this.vars.immediateRender === !0, this.data = this.vars.data, this._reversed = this.vars.reversed === !0, B) {
            s || i.wake();
            var n = this.vars.useFrames ? H : B;
            n.add(this, n._time), this.vars.paused && this.paused(!0)
        }
    });
    i = T.ticker = new a.Ticker, r = T.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1, r.play = function(e, t) {
        return arguments.length && this.seek(e, t), this.reversed(!1).paused(!1)
    }, r.pause = function(e, t) {
        return arguments.length && this.seek(e, t), this.paused(!0)
    }, r.resume = function(e, t) {
        return arguments.length && this.seek(e, t), this.paused(!1)
    }, r.seek = function(e, t) {
        return this.totalTime(Number(e), t !== !1)
    }, r.restart = function(e, t) {
        return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
    }, r.reverse = function(e, t) {
        return arguments.length && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
    }, r.render = function() {}, r.invalidate = function() {
        return this
    }, r._enabled = function(e, t) {
        return s || i.wake(), this._gc = !e, this._active = e && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration, t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
    }, r._kill = function() {
        return this._enabled(!1, !1)
    }, r.kill = function(e, t) {
        return this._kill(e, t), this
    }, r._uncache = function(e) {
        for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
        return this
    }, r.eventCallback = function(e, t, n, r) {
        if (null == e) return null;
        if ("on" === e.substr(0, 2)) {
            var i, s = this.vars;
            if (1 === arguments.length) return s[e];
            if (null == t) delete s[e];
            else if (s[e] = t, s[e + "Params"] = n, s[e + "Scope"] = r, n) for (i = n.length; --i > -1;)"{self}" === n[i] && (n = s[e + "Params"] = n.concat(), n[i] = this);
            "onUpdate" === e && (this._onUpdate = t)
        }
        return this
    }, r.delay = function(e) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
    }, r.duration = function(e) {
        return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
    }, r.totalDuration = function(e) {
        return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
    }, r.time = function(e, t) {
        return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
    }, r.totalTime = function(e, t, n) {
        if (s || i.wake(), !arguments.length) return this._totalTime;
        if (this._timeline) {
            if (0 > e && !n && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                this._dirty && this.totalDuration();
                var r = this._totalDuration,
                    o = this._timeline;
                if (e > r && !n && (e = r), this._startTime = (this._paused ? this._pauseTime : o._time) - (this._reversed ? r - e : e) / this._timeScale, o._dirty || this._uncache(!1), !o._active) for (; o._timeline;) o.totalTime(o._totalTime, !0), o = o._timeline
            }
            this._gc && this._enabled(!0, !1), this._totalTime !== e && this.render(e, t, !1)
        }
        return this
    }, r.startTime = function(e) {
        return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
    }, r.timeScale = function(e) {
        if (!arguments.length) return this._timeScale;
        if (e = e || 1e-6, this._timeline && this._timeline.smoothChildTiming) {
            var t = this._pauseTime,
                n = t || 0 === t ? t : this._timeline.totalTime();
            this._startTime = n - (n - this._startTime) * this._timeScale / e
        }
        return this._timeScale = e, this._uncache(!1)
    }, r.reversed = function(e) {
        return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._totalTime, !0)), this) : this._reversed
    }, r.paused = function(e) {
        if (!arguments.length) return this._paused;
        if (e != this._paused && this._timeline) {
            s || e || i.wake();
            var t = this._timeline.rawTime(),
                n = t - this._pauseTime;
            !e && this._timeline.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = !e && this._totalTime > 0 && this._totalTime < this._totalDuration, e || 0 === n || 0 === this._duration || this.render(this._totalTime, !0, !0)
        }
        return this._gc && !e && this._enabled(!0, !1), this
    };
    var N = d("core.SimpleTimeline", function(e) {
        T.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    r = N.prototype = new T, r.constructor = N, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function(e, t) {
        var n, r;
        if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), n = this._last, this._sortChildren) for (r = e._startTime; n && n._startTime > r;) n = n._prev;
        return n ? (e._next = n._next, n._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = n, this._timeline && this._uncache(!0), this
    }, r._remove = function(e, t) {
        return e.timeline === this && (t || e._enabled(!1, !0), e.timeline = null, e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), this._timeline && this._uncache(!0)), this
    }, r.render = function(e, t, n) {
        var r, i = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = e; i;) r = i._next, (i._active || e >= i._startTime && !i._paused) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)), i = r
    }, r.rawTime = function() {
        return s || i.wake(), this._totalTime
    };
    var C = d("TweenLite", function(e, t, n) {
        if (T.call(this, t, n), null == e) throw "Cannot tween a null target.";
        this.target = e = "string" != typeof e ? e : C.selector(e) || e;
        var r, i, s, o = e.jquery || e.length && e[0] && e[0].nodeType && e[0].style,
            u = this.vars.overwrite;
        if (this._overwrite = u = null == u ? P[C.defaultOverwrite] : "number" == typeof u ? u >> 0 : P[u], (o || e instanceof Array) && "number" != typeof e[0]) for (this._targets = s = f.call(e, 0), this._propLookup = [], this._siblings = [], r = 0; s.length > r; r++) i = s[r], i ? "string" != typeof i ? i.length && i[0] && i[0].nodeType && i[0].style ? (s.splice(r--, 1), this._targets = s = s.concat(f.call(i, 0))) : (this._siblings[r] = j(i, this, !1), 1 === u && this._siblings[r].length > 1 && F(i, this, null, 1, this._siblings[r])) : (i = s[r--] = C.selector(i), "string" == typeof i && s.splice(r + 1, 1)) : s.splice(r--, 1);
        else this._propLookup = {}, this._siblings = j(e, this, !1), 1 === u && this._siblings.length > 1 && F(e, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === t && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
    }, !0),
        k = function(e) {
            return e.length && e[0] && e[0].nodeType && e[0].style
        },
        L = function(e, t) {
            var n, r = {};
            for (n in e) D[n] || n in t && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n || !(!O[n] || O[n] && O[n]._autoCSS) || (r[n] = e[n], delete e[n]);
            e.css = r
        };
    r = C.prototype = new T, r.constructor = C, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = !1, C.version = "1.9.7", C.defaultEase = r._ease = new g(null, null, 1, 1), C.defaultOverwrite = "auto", C.ticker = i, C.autoSleep = !0, C.selector = e.$ || e.jQuery ||
    function(t) {
        return e.$ ? (C.selector = e.$, e.$(t)) : e.document ? e.document.getElementById("#" === t.charAt(0) ? t.substr(1) : t) : t
    };
    var A = C._internals = {},
        O = C._plugins = {},
        M = C._tweenLookup = {},
        _ = 0,
        D = A.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1
        },
        P = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        },
        H = T._rootFramesTimeline = new N,
        B = T._rootTimeline = new N;
    B._startTime = i.time, H._startTime = i.frame, B._active = H._active = !0, T._updateRoot = function() {
        if (B.render((i.time - B._startTime) * B._timeScale, !1, !1), H.render((i.frame - H._startTime) * H._timeScale, !1, !1), !(i.frame % 120)) {
            var e, t, n;
            for (n in M) {
                for (t = M[n].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
                0 === t.length && delete M[n]
            }
            if (n = B._first, (!n || n._paused) && C.autoSleep && !H._first && 1 === i._listeners.tick.length) {
                for (; n && n._paused;) n = n._next;
                n || i.sleep()
            }
        }
    }, i.addEventListener("tick", T._updateRoot);
    var j = function(e, t, n) {
            var r, i, s = e._gsTweenID;
            if (M[s || (e._gsTweenID = s = "t" + _++)] || (M[s] = {
                target: e,
                tweens: []
            }), t && (r = M[s].tweens, r[i = r.length] = t, n)) for (; --i > -1;) r[i] === t && r.splice(i, 1);
            return M[s].tweens
        },
        F = function(e, t, n, r, i) {
            var s, o, u, a;
            if (1 === r || r >= 4) {
                for (a = i.length, s = 0; a > s; s++) if ((u = i[s]) !== t) u._gc || u._enabled(!1, !1) && (o = !0);
                else if (5 === r) break;
                return o
            }
            var f, l = t._startTime + 1e-10,
                c = [],
                h = 0,
                p = 0 === t._duration;
            for (s = i.length; --s > -1;)(u = i[s]) === t || u._gc || u._paused || (u._timeline !== t._timeline ? (f = f || I(t, 0, p), 0 === I(u, f, p) && (c[h++] = u)) : l >= u._startTime && u._startTime + u.totalDuration() / u._timeScale + 1e-10 > l && ((p || !u._initted) && 2e-10 >= l - u._startTime || (c[h++] = u)));
            for (s = h; --s > -1;) u = c[s], 2 === r && u._kill(n, e) && (o = !0), (2 !== r || !u._firstPT && u._initted) && u._enabled(!1, !1) && (o = !0);
            return o
        },
        I = function(e, t, n) {
            for (var r = e._timeline, i = r._timeScale, s = e._startTime, o = 1e-10; r._timeline;) {
                if (s += r._startTime, i *= r._timeScale, r._paused) return -100;
                r = r._timeline
            }
            return s /= i, s > t ? s - t : n && s === t || !e._initted && 2 * o > s - t ? o : (s += e.totalDuration() / e._timeScale / i) > t + o ? 0 : s - t - o
        };
    r._init = function() {
        var e, t, n, r, i = this.vars,
            s = this._overwrittenProps,
            o = this._duration,
            u = i.ease;
        if (i.startAt) {
            if (i.startAt.overwrite = 0, i.startAt.immediateRender = !0, this._startAt = C.to(this.target, 0, i.startAt), i.immediateRender && (this._startAt = null, 0 === this._time && 0 !== o)) return
        } else if (i.runBackwards && i.immediateRender && 0 !== o) if (this._startAt) this._startAt.render(-1, !0), this._startAt = null;
        else if (0 === this._time) {
            n = {};
            for (r in i) D[r] && "autoCSS" !== r || (n[r] = i[r]);
            return n.overwrite = 0, this._startAt = C.to(this.target, 0, n), void 0
        }
        if (this._ease = u ? u instanceof g ? i.easeParams instanceof Array ? u.config.apply(u, i.easeParams) : u : "function" == typeof u ? new g(u, i.easeParams) : y[u] || C.defaultEase : C.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (e = this._targets.length; --e > -1;) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], s ? s[e] : null) && (t = !0);
        else t = this._initProps(this.target, this._propLookup, this._siblings, s);
        if (t && C._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), i.runBackwards) for (n = this._firstPT; n;) n.s += n.c, n.c = -n.c, n = n._next;
        this._onUpdate = i.onUpdate, this._initted = !0
    }, r._initProps = function(e, t, n, r) {
        var i, s, o, u, a, f, l;
        if (null == e) return !1;
        this.vars.css || e.style && e.nodeType && O.css && this.vars.autoCSS !== !1 && L(this.vars, e);
        for (i in this.vars) {
            if (D[i]) {
                if (("onStartParams" === i || "onUpdateParams" === i || "onCompleteParams" === i || "onReverseCompleteParams" === i || "onRepeatParams" === i) && (a = this.vars[i])) for (s = a.length; --s > -1;)"{self}" === a[s] && (a = this.vars[i] = a.concat(), a[s] = this)
            } else if (O[i] && (u = new O[i])._onInitTween(e, this.vars[i], this)) {
                for (this._firstPT = f = {
                    _next: this._firstPT,
                    t: u,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: !0,
                    n: i,
                    pg: !0,
                    pr: u._priority
                }, s = u._overwriteProps.length; --s > -1;) t[u._overwriteProps[s]] = this._firstPT;
                (u._priority || u._onInitAllProps) && (o = !0), (u._onDisable || u._onEnable) && (this._notifyPluginsOfEnabled = !0)
            } else this._firstPT = t[i] = f = {
                _next: this._firstPT,
                t: e,
                p: i,
                f: "function" == typeof e[i],
                n: i,
                pg: !1,
                pr: 0
            }, f.s = f.f ? e[i.indexOf("set") || "function" != typeof e["get" + i.substr(3)] ? i : "get" + i.substr(3)]() : parseFloat(e[i]), l = this.vars[i], f.c = "string" == typeof l && "=" === l.charAt(1) ? parseInt(l.charAt(0) + "1", 10) * Number(l.substr(2)) : Number(l) - f.s || 0;
            f && f._next && (f._next._prev = f)
        }
        return r && this._kill(r, e) ? this._initProps(e, t, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && F(e, this, t, this._overwrite, n) ? (this._kill(t, e), this._initProps(e, t, n, r)) : o
    }, r.render = function(e, t, n) {
        var r, i, s, o = this._time;
        if (e >= this._duration) this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (r = !0, i = "onComplete"), 0 === this._duration && ((0 === e || 0 > this._rawPrevTime) && this._rawPrevTime !== e && (n = !0, this._rawPrevTime > 0 && (i = "onReverseComplete", t && (e = -1))), this._rawPrevTime = e);
        else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === this._duration && this._rawPrevTime > 0) && (i = "onReverseComplete", r = this._reversed), 0 > e ? (this._active = !1, 0 === this._duration && (this._rawPrevTime >= 0 && (n = !0), this._rawPrevTime = e)) : this._initted || (n = !0);
        else if (this._totalTime = this._time = e, this._easeType) {
            var u = e / this._duration,
                a = this._easeType,
                f = this._easePower;
            (1 === a || 3 === a && u >= .5) && (u = 1 - u), 3 === a && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === a ? 1 - u : 2 === a ? u : .5 > e / this._duration ? u / 2 : 1 - u / 2
        } else this.ratio = this._ease.getRatio(e / this._duration);
        if (this._time !== o || n) {
            if (!this._initted) {
                if (this._init(), !this._initted) return;
                this._time && !r ? this.ratio = this._ease.getRatio(this._time / this._duration) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
            }
            for (this._active || this._paused || (this._active = !0), 0 === o && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === this._duration) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || m))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
            this._onUpdate && (0 > e && this._startAt && this._startAt.render(e, t, n), t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || m)), i && (this._gc || (0 > e && this._startAt && !this._onUpdate && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || m)))
        }
    }, r._kill = function(e, t) {
        if ("all" === e && (e = null), null != e || null != t && t !== this.target) {
            t = "string" != typeof t ? t || this._targets || this.target : C.selector(t) || t;
            var n, r, i, s, o, u, a, f;
            if ((t instanceof Array || k(t)) && "number" != typeof t[0]) for (n = t.length; --n > -1;) this._kill(e, t[n]) && (u = !0);
            else {
                if (this._targets) {
                    for (n = this._targets.length; --n > -1;) if (t === this._targets[n]) {
                        o = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
                        break
                    }
                } else {
                    if (t !== this.target) return !1;
                    o = this._propLookup, r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                }
                if (o) {
                    a = e || o, f = e !== r && "all" !== r && e !== o && (null == e || e._tempKill !== !0);
                    for (i in a)(s = o[i]) && (s.pg && s.t._kill(a) && (u = !0), s.pg && 0 !== s.t._overwriteProps.length || (s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null), delete o[i]), f && (r[i] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return u
        }
        return this._enabled(!1, !1)
    }, r.invalidate = function() {
        return this._notifyPluginsOfEnabled && C._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
    }, r._enabled = function(e, t) {
        if (s || i.wake(), e && this._gc) {
            var n, r = this._targets;
            if (r) for (n = r.length; --n > -1;) this._siblings[n] = j(r[n], this, !0);
            else this._siblings = j(this.target, this, !0)
        }
        return T.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? C._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
    }, C.to = function(e, t, n) {
        return new C(e, t, n)
    }, C.from = function(e, t, n) {
        return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new C(e, t, n)
    }, C.fromTo = function(e, t, n, r) {
        return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new C(e, t, r)
    }, C.delayedCall = function(e, t, n, r, i) {
        return new C(t, 0, {
            delay: e,
            onComplete: t,
            onCompleteParams: n,
            onCompleteScope: r,
            onReverseComplete: t,
            onReverseCompleteParams: n,
            onReverseCompleteScope: r,
            immediateRender: !1,
            useFrames: i,
            overwrite: 0
        })
    }, C.set = function(e, t) {
        return new C(e, 0, t)
    }, C.killTweensOf = C.killDelayedCallsTo = function(e, t) {
        for (var n = C.getTweensOf(e), r = n.length; --r > -1;) n[r]._kill(t, e)
    }, C.getTweensOf = function(e) {
        if (null == e) return [];
        e = "string" != typeof e ? e : C.selector(e) || e;
        var t, n, r, i;
        if ((e instanceof Array || k(e)) && "number" != typeof e[0]) {
            for (t = e.length, n = []; --t > -1;) n = n.concat(C.getTweensOf(e[t]));
            for (t = n.length; --t > -1;) for (i = n[t], r = t; --r > -1;) i === n[r] && n.splice(t, 1)
        } else for (n = j(e).concat(), t = n.length; --t > -1;) n[t]._gc && n.splice(t, 1);
        return n
    };
    var q = d("plugins.TweenPlugin", function(e, t) {
        this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = q.prototype
    }, !0);
    if (r = q.prototype, q.version = "1.9.1", q.API = 2, r._firstPT = null, r._addTween = function(e, t, n, r, i, s) {
        var o, u;
        null != r && (o = "number" == typeof r || "=" !== r.charAt(1) ? Number(r) - n : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2))) && (this._firstPT = u = {
            _next: this._firstPT,
            t: e,
            p: t,
            s: n,
            c: o,
            f: "function" == typeof e[t],
            n: i || t,
            r: s
        }, u._next && (u._next._prev = u))
    }, r.setRatio = function(e) {
        for (var t, n = this._firstPT, r = 1e-6; n;) t = n.c * e + n.s, n.r ? t = t + (t > 0 ? .5 : -0.5) >> 0 : r > t && t > -r && (t = 0), n.f ? n.t[n.p](t) : n.t[n.p] = t, n = n._next
    }, r._kill = function(e) {
        var t, n = this._overwriteProps,
            r = this._firstPT;
        if (null != e[this._propName]) this._overwriteProps = [];
        else for (t = n.length; --t > -1;) null != e[n[t]] && n.splice(t, 1);
        for (; r;) null != e[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)), r = r._next;
        return !1
    }, r._roundProps = function(e, t) {
        for (var n = this._firstPT; n;)(e[this._propName] || null != n.n && e[n.n.split(this._propName + "_").join("")]) && (n.r = t), n = n._next
    }, C._onPluginEvent = function(e, t) {
        var n, r, i, s, o, u = t._firstPT;
        if ("_onInitAllProps" === e) {
            for (; u;) {
                for (o = u._next, r = i; r && r.pr > u.pr;) r = r._next;
                (u._prev = r ? r._prev : s) ? u._prev._next = u : i = u, (u._next = r) ? r._prev = u : s = u, u = o
            }
            u = t._firstPT = i
        }
        for (; u;) u.pg && "function" == typeof u.t[e] && u.t[e]() && (n = !0), u = u._next;
        return n
    }, q.activate = function(e) {
        for (var t = e.length; --t > -1;) e[t].API === q.API && (O[(new e[t])._propName] = e[t]);
        return !0
    }, p.plugin = function(e) {
        if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
        var t, n = e.propName,
            r = e.priority || 0,
            i = e.overwriteProps,
            s = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            },
            o = d("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function() {
                q.call(this, n, r), this._overwriteProps = i || []
            }, e.global === !0),
            u = o.prototype = new q(n);
        u.constructor = o, o.API = e.API;
        for (t in s)"function" == typeof e[t] && (u[s[t]] = e[t]);
        return o.version = e.version, q.activate([o]), o
    }, t = e._gsQueue) {
        for (n = 0; t.length > n; n++) t[n]();
        for (r in c) c[r].func || e.console.log("GSAP encountered missing dependency: com.greensock." + r)
    }
    s = !1
}(window);
(function(e) {
    e.superscrollorama = function(t) {
        function c() {
            i.scroll(function() {
                a = !0
            });
            TweenLite.ticker.addEventListener("tick", p)
        }
        function h(e) {
            var t = {
                top: parseFloat(e.css("top")),
                left: parseFloat(e.css("left"))
            };
            isNaN(t.top) && (t.top = 0);
            isNaN(t.left) && (t.left = 0);
            return t
        }
        function p() {
            if (a) {
                m();
                a = !1
            }
        }
        function d(e) {
            e.el.css("position", e.origPositioning.pos);
            e.el.css("top", e.origPositioning.top);
            e.el.css("left", e.origPositioning.left)
        }
        function v(e, t) {
            e && (e.totalProgress ? e.totalProgress(t).pause() : e.progress(t).pause())
        }
        function m() {
            var t = n.settings.isVertical ? i.scrollTop() + u.y : i.scrollLeft() + u.x,
                r = n.settings.triggerAtCenter ? n.settings.isVertical ? -i.height() / 2 : -i.width() / 2 : 0,
                a, l, c, p = s.length;
            for (a = 0; a < p; a++) {
                var m = s[a],
                    g = m.target,
                    y = m.offset;
                if (typeof g == "string") {
                    f = e(g).offset();
                    l = n.settings.isVertical ? f.top + u.y : f.left + u.x;
                    y += r
                } else if (typeof g == "number") l = g;
                else if (e.isFunction(g)) l = g.call(this);
                else {
                    f = g.offset();
                    l = n.settings.isVertical ? f.top + u.y : f.left + u.x;
                    y += r
                }
                l += y;
                c = l + m.dur;
                if (t > l && t < c && m.state !== "TWEENING") {
                    m.state = "TWEENING";
                    m.start = l;
                    m.end = c
                }
                if (t < l && m.state !== "BEFORE" && m.reverse) {
                    n.settings.playoutAnimations || m.dur === 0 ? m.tween.reverse() : v(m.tween, 0);
                    m.state = "BEFORE"
                } else if (t > c && m.state !== "AFTER") {
                    n.settings.playoutAnimations || m.dur === 0 ? m.tween.play() : v(m.tween, 1);
                    m.state = "AFTER"
                } else if (m.state === "TWEENING") {
                    var b = !1;
                    m.tween.repeat && (b = m.tween.repeat() === -1);
                    if (b) {
                        var w = m.tween.totalProgress();
                        if (m.playeadLastPosition === null || w === m.playeadLastPosition) w === 1 ? m.tween.yoyo() ? m.tween.reverse() : m.tween.totalProgress(0).play() : m.tween.play();
                        m.playeadLastPosition = w
                    } else v(m.tween, (t - m.start) / (m.end - m.start))
                }
            }
            var E = o.length;
            for (a = 0; a < E; a++) {
                var S = o[a],
                    x = S.el;
                if (S.state !== "PINNED") {
                    S.state === "UPDATE" && d(S);
                    l = n.settings.isVertical ? S.spacer.offset().top + u.y : S.spacer.offset().left + u.x;
                    l += S.offset;
                    c = l + S.dur;
                    var T = t > c && S.state === "BEFORE" || t < l && S.state === "AFTER",
                        N = t > l && t < c;
                    if (N || T) {
                        S.pushFollowers && x.css("position") === "static" && x.css("position", "relative");
                        S.origPositioning = {
                            pos: x.css("position"),
                            top: S.spacer.css("top"),
                            left: S.spacer.css("left")
                        };
                        S.fixedPositioning = {
                            top: n.settings.isVertical ? -S.offset : S.spacer.offset().top,
                            left: n.settings.isVertical ? S.spacer.offset().left : -S.offset
                        };
                        x.css("position", "fixed");
                        x.css("top", S.fixedPositioning.top);
                        x.css("left", S.fixedPositioning.left);
                        S.pinStart = l;
                        S.pinEnd = c;
                        if (S.pushFollowers) n.settings.isVertical ? S.spacer.height(S.dur + x.outerHeight()) : S.spacer.width(S.dur + x.outerWidth());
                        else if (S.origPositioning.pos === "absolute") {
                            S.spacer.width(0);
                            S.spacer.height(0)
                        } else n.settings.isVertical ? S.spacer.height(x.outerHeight()) : S.spacer.width(x.outerWidth());
                        S.state === "UPDATE" ? S.anim && v(S.anim, 0) : S.onPin && S.onPin(S.state === "AFTER");
                        S.state = "PINNED"
                    }
                }
                if (S.state === "PINNED") if (t < S.pinStart || t > S.pinEnd) {
                    var C = t < S.pinStart;
                    S.state = C ? "BEFORE" : "AFTER";
                    v(S.anim, C ? 0 : 1);
                    var k = C ? 0 : S.dur;
                    n.settings.isVertical ? S.spacer.height(S.pushFollowers ? k : 0) : S.spacer.width(S.pushFollowers ? k : 0);
                    var L = S.fixedPositioning.top - h(S.el).top,
                        A = S.fixedPositioning.left - h(S.el).left;
                    d(S);
                    if (!S.pushFollowers || S.origPositioning.pos === "absolute") {
                        var O;
                        if (S.origPositioning.pos === "relative") {
                            O = n.settings.isVertical ? parseFloat(S.origPositioning.top) : parseFloat(S.origPositioning.left);
                            isNaN(O) && (O = 0)
                        } else O = n.settings.isVertical ? S.spacer.position().top : S.spacer.position().left;
                        var M = n.settings.isVertical ? "top" : "left";
                        S.el.css(M, O + k)
                    }
                    L !== 0 && S.el.css("top", h(S.el).top - L);
                    A !== 0 && S.el.css("left", h(S.el).left - A);
                    S.onUnpin && S.onUnpin(!C)
                } else S.anim && v(S.anim, (t - S.pinStart) / (S.pinEnd - S.pinStart))
            }
        }
        var n = this,
            r = {
                isVertical: !0,
                triggerAtCenter: !0,
                playoutAnimations: !0,
                reverse: !0
            };
        n.settings = e.extend({}, r, t);
        var i = e(window),
            s = [],
            o = [],
            u = {
                x: 0,
                y: 0
            },
            a = !1,
            f, l;
        n.addTween = function(e, t, r, i, o) {
            t.pause();
            s.push({
                target: e,
                tween: t,
                offset: i || 0,
                dur: r || 0,
                reverse: typeof o != "undefined" ? o : n.settings.reverse,
                state: "BEFORE"
            });
            return n
        };
        n.pin = function(t, r, i) {
            typeof t == "string" && (t = e(t));
            var s = {
                offset: 0,
                pushFollowers: !0
            };
            i = e.extend({}, s, i);
            i.anim && i.anim.pause();
            var u = e('<div class="superscrollorama-pin-spacer"></div>');
            u.css("position", "relative");
            u.css("top", t.css("top"));
            u.css("left", t.css("left"));
            t.before(u);
            o.push({
                el: t,
                state: "BEFORE",
                dur: r,
                offset: i.offset,
                anim: i.anim,
                pushFollowers: i.pushFollowers,
                spacer: u,
                onPin: i.onPin,
                onUnpin: i.onUnpin
            });
            return n
        };
        n.updatePin = function(t, r, i) {
            typeof t == "string" && (t = e(t));
            i.anim && i.anim.pause();
            var s = o.length;
            for (l = 0; l < s; l++) {
                var u = o[l];
                if (t.get(0) === u.el.get(0)) {
                    r && (u.dur = r);
                    i.anim && (u.anim = i.anim);
                    i.offset && (u.offset = i.offset);
                    typeof i.pushFollowers != "undefined" && (u.pushFollowers = i.pushFollowers);
                    i.onPin && (u.onPin = i.onPin);
                    i.onUnpin && (u.onUnpin = i.onUnpin);
                    if ((r || i.anim || i.offset) && u.state === "PINNED") {
                        u.state = "UPDATE";
                        m()
                    }
                }
            }
            return n
        };
        n.removeTween = function(e, t, r) {
            var i = s.length;
            typeof r == "undefined" && (r = !0);
            for (var o = 0; o < i; o++) {
                var u = s[o];
                if (u.target === e && (!t || u.tween === t)) {
                    s.splice(o, 1);
                    r && v(u.tween, 0);
                    i--;
                    o--
                }
            }
            return n
        };
        n.removePin = function(t, r) {
            typeof t == "string" && (t = e(t));
            typeof r == "undefined" && (r = !0);
            var i = o.length;
            for (var s = 0; s < i; s++) {
                var u = o[s];
                if (u.el.is(t)) {
                    o.splice(s, 1);
                    if (r) {
                        u.spacer.remove();
                        d(u);
                        u.anim && v(u.anim, 0)
                    }
                    i--;
                    s--
                }
            }
            return n
        };
        n.setScrollContainerOffset = function(e, t) {
            u.x = e;
            u.y = t;
            return n
        };
        n.triggerCheckAnim = function(e) {
            e ? m() : a = !0;
            return n
        };
        c();
        return n
    }
})(jQuery);
(function(e, t, n, r) {
    function i(t, n) {
        this.element = t, this.options = e.extend({}, o, n), this._defaults = o, this._name = s, this.init()
    }
    var s = "stellar",
        o = {
            scrollProperty: "scroll",
            positionProperty: "position",
            horizontalScrolling: !0,
            verticalScrolling: !0,
            horizontalOffset: 0,
            verticalOffset: 0,
            parallaxBackgrounds: !0,
            parallaxElements: !0,
            hideDistantElements: !0,
            viewportDetectionInterval: 1e4,
            hideElement: function(e) {
                e.hide()
            },
            showElement: function(e) {
                e.show()
            }
        },
        u = {
            scroll: {
                getTop: function(e) {
                    return e.scrollTop()
                },
                setTop: function(e, t) {
                    e.scrollTop(t)
                },
                getLeft: function(e) {
                    return e.scrollLeft()
                },
                setLeft: function(e, t) {
                    e.scrollLeft(t)
                }
            },
            position: {
                getTop: function(e) {
                    return parseInt(e.css("top"), 10) * -1
                },
                setTop: function(e, t) {
                    e.css("top", t)
                },
                getLeft: function(e) {
                    return parseInt(e.css("left"), 10) * -1
                },
                setLeft: function(e, t) {
                    e.css("left", t)
                }
            },
            margin: {
                getTop: function(e) {
                    return parseInt(e.css("margin-top"), 10) * -1
                },
                setTop: function(e, t) {
                    e.css("margin-top", t)
                },
                getLeft: function(e) {
                    return parseInt(e.css("margin-left"), 10) * -1
                },
                setLeft: function(e, t) {
                    e.css("margin-left", t)
                }
            },
            transform: {
                getTop: function(e) {
                    return e.css(f + "transform") !== "none" ? parseInt(e.css(f + "transform").match(/(-?[0-9]+)/g)[5], 10) * -1 : 0
                },
                setTop: function(e, t) {
                    l(e, t, "Y")
                },
                getLeft: function(e) {
                    return e.css(f + "transform") !== "none" ? parseInt(e.css(f + "transform").match(/(-?[0-9]+)/g)[4], 10) * -1 : 0
                },
                setLeft: function(e, t) {
                    l(e, t, "X")
                }
            }
        },
        a = {
            position: {
                setTop: function(e, t) {
                    e.css("top", t)
                },
                setLeft: function(e, t) {
                    e.css("left", t)
                }
            },
            transform: {
                setTop: function(e, t, n) {
                    l(e, t - n, "Y")
                },
                setLeft: function(e, t, n) {
                    l(e, t - n, "X")
                }
            }
        },
        f = function() {
            var t = "";
            return e.browser.webkit ? t = "-webkit-" : e.browser.mozilla ? t = "-moz-" : e.browser.opera ? t = "-o-" : e.browser.msie && (t = "-ms-"), t
        }(),
        l = function(e, t, n) {
            var r = e.css(f + "transform");
            r === "none" ? e.css(f + "transform", "translate" + n + "(" + t + "px)") : e.css(f + "transform", c(r, /(-?[0-9]+[.]?[0-9]*)/g, n === "X" ? 5 : 6, t))
        },
        c = function(e, t, n, i) {
            var s, o, u;
            return e.search(t) === -1 ? e : (s = e.split(t), u = n * 2 - 1, s[u] === r ? e : (s[u] = i, s.join("")))
        };
    i.prototype = {
        init: function() {
            this.options.name = s + "_" + Math.floor(Math.random() * 1e4), this._defineElements(), this._defineGetters(), this._defineSetters(), this.refresh(), this._startViewportDetectionLoop(), this._startAnimationLoop()
        },
        _defineElements: function() {
            this.element === n.body && (this.element = t), this.$scrollElement = e(this.element), this.$element = this.element === t ? e("body") : this.$scrollElement, this.$viewportElement = this.options.viewportElement !== r ? e(this.options.viewportElement) : this.$scrollElement[0] === t || this.options.scrollProperty.indexOf("scroll") === 0 ? this.$scrollElement : this.$scrollElement.parent()
        },
        _defineGetters: function() {
            var e = this;
            this._getScrollLeft = function() {
                return u[e.options.scrollProperty].getLeft(e.$scrollElement)
            }, this._getScrollTop = function() {
                return u[e.options.scrollProperty].getTop(e.$scrollElement)
            }
        },
        _defineSetters: function() {
            var e = this;
            this._setScrollLeft = function(t) {
                u[e.options.scrollProperty].setLeft(e.$scrollElement, t)
            }, this._setScrollTop = function(t) {
                u[e.options.scrollProperty].setTop(e.$scrollElement, t)
            }, this._setLeft = function(t, n, r) {
                a[e.options.positionProperty].setLeft(t, n, r)
            }, this._setTop = function(t, n, r) {
                a[e.options.positionProperty].setTop(t, n, r)
            }
        },
        refresh: function() {
            var n = this,
                r = n._getScrollLeft(),
                i = n._getScrollTop();
            this._setScrollLeft(0), this._setScrollTop(0), this._setOffsets(), this._findParticles(), this._findBackgrounds(), navigator.userAgent.indexOf("WebKit") > 0 && e(t).load(function() {
                var e = n._getScrollLeft(),
                    t = n._getScrollTop();
                n._setScrollLeft(e + 1), n._setScrollTop(t + 1), n._setScrollLeft(e), n._setScrollTop(t)
            }), n._setScrollLeft(r), n._setScrollTop(i)
        },
        _findParticles: function() {
            var t = this,
                n = this._getScrollLeft(),
                i = this._getScrollTop();
            if (this.particles !== r) for (var s = this.particles.length - 1; s >= 0; s--) this.particles[s].$element.data("stellar-elementIsActive", r);
            this.particles = [];
            if (!this.options.parallaxElements) return;
            this.$element.find("[data-stellar-ratio]").each(function(n) {
                var i = e(this),
                    s, o, u, a, f, l, c, h, p, v = 0,
                    m = 0,
                    g = 0,
                    y = 0;
                if (!i.data("stellar-elementIsActive")) i.data("stellar-elementIsActive", this);
                else if (i.data("stellar-elementIsActive") !== this) return;
                t.options.showElement(i), i.data("stellar-startingLeft") ? (i.css("left", i.data("stellar-startingLeft")), i.css("top", i.data("stellar-startingTop"))) : (i.data("stellar-startingLeft", i.css("left")), i.data("stellar-startingTop", i.css("top"))), u = i.position().left, a = i.position().top, f = i.css("margin-left") === "auto" ? 0 : parseInt(i.css("margin-left"), 10), l = i.css("margin-top") === "auto" ? 0 : parseInt(i.css("margin-top"), 10), h = i.offset().left - f, p = i.offset().top - l, i.parents().each(function() {
                    var t = e(this);
                    if (t.data("stellar-offset-parent") === !0) return v = g, m = y, c = t, !1;
                    g += t.position().left, y += t.position().top
                }), s = i.data("stellar-horizontal-offset") !== r ? i.data("stellar-horizontal-offset") : c !== r && c.data("stellar-horizontal-offset") !== r ? c.data("stellar-horizontal-offset") : t.horizontalOffset, o = i.data("stellar-vertical-offset") !== r ? i.data("stellar-vertical-offset") : c !== r && c.data("stellar-vertical-offset") !== r ? c.data("stellar-vertical-offset") : t.verticalOffset, t.particles.push({
                    $element: i,
                    $offsetParent: c,
                    isFixed: i.css("position") === "fixed",
                    horizontalOffset: s,
                    verticalOffset: o,
                    startingPositionLeft: u,
                    startingPositionTop: a,
                    startingOffsetLeft: h,
                    startingOffsetTop: p,
                    parentOffsetLeft: v,
                    parentOffsetTop: m,
                    stellarRatio: i.data("stellar-ratio") !== r ? i.data("stellar-ratio") : 1,
                    width: i.outerWidth(!0),
                    height: i.outerHeight(!0),
                    isHidden: !1
                })
            })
        },
        _findBackgrounds: function() {
            var t = this,
                n = this._getScrollLeft(),
                i = this._getScrollTop(),
                s;
            this.backgrounds = [];
            if (!this.options.parallaxBackgrounds) return;
            s = this.$element.find("[data-stellar-background-ratio]"), this.$element.is("[data-stellar-background-ratio]") && s.add(this.$element), s.each(function() {
                var s = e(this),
                    o = s.css("background-position").split(" "),
                    u, a, f, l, c, h, p, v, m, g = 0,
                    y = 0,
                    w = 0,
                    E = 0;
                if (!s.data("stellar-backgroundIsActive")) s.data("stellar-backgroundIsActive", this);
                else if (s.data("stellar-backgroundIsActive") !== this) return;
                s.data("stellar-backgroundStartingLeft") ? s.css("background-position", s.data("stellar-backgroundStartingLeft") + " " + s.data("stellar-backgroundStartingTop")) : (s.data("stellar-backgroundStartingLeft", o[0]), s.data("stellar-backgroundStartingTop", o[1])), c = s.css("margin-left") === "auto" ? 0 : parseInt(s.css("margin-left"), 10), h = s.css("margin-top") === "auto" ? 0 : parseInt(s.css("margin-top"), 10), p = s.offset().left - c - n, v = s.offset().top - h - i, s.parents().each(function() {
                    var t = e(this);
                    if (t.data("stellar-offset-parent") === !0) return g = w, y = E, m = t, !1;
                    w += t.position().left, E += t.position().top
                }), u = s.data("stellar-horizontal-offset") !== r ? s.data("stellar-horizontal-offset") : m !== r && m.data("stellar-horizontal-offset") !== r ? m.data("stellar-horizontal-offset") : t.horizontalOffset, a = s.data("stellar-vertical-offset") !== r ? s.data("stellar-vertical-offset") : m !== r && m.data("stellar-vertical-offset") !== r ? m.data("stellar-vertical-offset") : t.verticalOffset, t.backgrounds.push({
                    $element: s,
                    $offsetParent: m,
                    isFixed: s.css("background-attachment") === "fixed",
                    horizontalOffset: u,
                    verticalOffset: a,
                    startingValueLeft: o[0],
                    startingValueTop: o[1],
                    startingBackgroundPositionLeft: isNaN(parseInt(o[0], 10)) ? 0 : parseInt(o[0], 10),
                    startingBackgroundPositionTop: isNaN(parseInt(o[1], 10)) ? 0 : parseInt(o[1], 10),
                    startingPositionLeft: s.position().left,
                    startingPositionTop: s.position().top,
                    startingOffsetLeft: p,
                    startingOffsetTop: v,
                    parentOffsetLeft: g,
                    parentOffsetTop: y,
                    stellarRatio: s.data("stellar-background-ratio") === r ? 1 : s.data("stellar-background-ratio")
                })
            })
        },
        destroy: function() {
            var t, n, r, i, s;
            for (s = this.particles.length - 1; s >= 0; s--) t = this.particles[s], n = t.$element.data("stellar-startingLeft"), r = t.$element.data("stellar-startingTop"), this._setLeft(t.$element, n, n), this._setTop(t.$element, r, r), this.options.showElement(t.$element), t.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null);
            for (s = this.backgrounds.length - 1; s >= 0; s--) i = this.backgrounds[s], i.$element.css("background-position", i.startingValueLeft + " " + i.startingValueTop);
            this._animationLoop = e.noop, clearInterval(this._viewportDetectionInterval)
        },
        _setOffsets: function() {
            var n = this;
            e(t).unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name), typeof this.options.horizontalOffset == "function" ? (this.horizontalOffset = this.options.horizontalOffset(), e(t).bind("resize.horizontal-" + this.name, function() {
                n.horizontalOffset = n.options.horizontalOffset()
            })) : this.horizontalOffset = this.options.horizontalOffset, typeof this.options.verticalOffset == "function" ? (this.verticalOffset = this.options.verticalOffset(), e(t).bind("resize.vertical-" + this.name, function() {
                n.verticalOffset = n.options.verticalOffset()
            })) : this.verticalOffset = this.options.verticalOffset
        },
        _repositionElements: function() {
            var e = this._getScrollLeft(),
                t = this._getScrollTop(),
                n, r, i, s, o, u, a, f = !0,
                l = !0,
                c, h, p, d, v;
            if (this.currentScrollLeft === e && this.currentScrollTop === t && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) return;
            this.currentScrollLeft = e, this.currentScrollTop = t, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight;
            for (v = this.particles.length - 1; v >= 0; v--) i = this.particles[v], s = i.isFixed ? 1 : 0, this.options.horizontalScrolling && (c = (e + i.horizontalOffset + this.viewportOffsetLeft + i.startingPositionLeft - i.startingOffsetLeft + i.parentOffsetLeft) * -(i.stellarRatio + s - 1) + i.startingPositionLeft, p = c - i.startingPositionLeft + i.startingOffsetLeft), this.options.verticalScrolling && (h = (t + i.verticalOffset + this.viewportOffsetTop + i.startingPositionTop - i.startingOffsetTop + i.parentOffsetTop) * -(i.stellarRatio + s - 1) + i.startingPositionTop, d = h - i.startingPositionTop + i.startingOffsetTop), this.options.hideDistantElements && (l = !this.options.horizontalScrolling || p + i.width > (i.isFixed ? 0 : e) && p < (i.isFixed ? 0 : e) + this.viewportWidth + this.viewportOffsetLeft, f = !this.options.verticalScrolling || d + i.height > (i.isFixed ? 0 : t) && d < (i.isFixed ? 0 : t) + this.viewportHeight + this.viewportOffsetTop), l && f ? (i.isHidden && (this.options.showElement(i.$element), i.isHidden = !1), this.options.horizontalScrolling && this._setLeft(i.$element, c, i.startingPositionLeft), this.options.verticalScrolling && this._setTop(i.$element, h, i.startingPositionTop)) : i.isHidden || (this.options.hideElement(i.$element), i.isHidden = !0);
            for (v = this.backgrounds.length - 1; v >= 0; v--) o = this.backgrounds[v], s = o.isFixed ? 0 : 1, u = this.options.horizontalScrolling ? (e + o.horizontalOffset - this.viewportOffsetLeft - o.startingOffsetLeft + o.parentOffsetLeft - o.startingBackgroundPositionLeft) * (s - o.stellarRatio) + "px" : o.startingValueLeft, a = this.options.verticalScrolling ? (t + o.verticalOffset - this.viewportOffsetTop - o.startingOffsetTop + o.parentOffsetTop - o.startingBackgroundPositionTop) * (s - o.stellarRatio) + "px" : o.startingValueTop, o.$element.css("background-position", u + " " + a)
        },
        _startViewportDetectionLoop: function() {
            var e = this,
                t = function() {
                    var t = e.$viewportElement.offset();
                    e.viewportWidth = e.$viewportElement.width(), e.viewportHeight = e.$viewportElement.height(), e.viewportOffsetTop = t !== null ? t.top : 0, e.viewportOffsetLeft = t !== null ? t.left : 0
                };
            t(), this._viewportDetectionInterval = setInterval(t, this.options.viewportDetectionInterval)
        },
        _startAnimationLoop: function() {
            var e = this,
                n = function() {
                    return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame ||
                    function(e, n) {
                        t.setTimeout(e, 1e3 / 60)
                    }
                }();
            this._animationLoop = function() {
                n(e._animationLoop), e._repositionElements()
            }, this._animationLoop()
        }
    }, e.fn[s] = function(t) {
        var n = arguments;
        if (t === r || typeof t == "object") return this.each(function() {
            e.data(this, "plugin_" + s) || e.data(this, "plugin_" + s, new i(this, t))
        });
        if (typeof t == "string" && t[0] !== "_" && t !== "init") return this.each(function() {
            var r = e.data(this, "plugin_" + s);
            r instanceof i && typeof r[t] == "function" && r[t].apply(r, Array.prototype.slice.call(n, 1)), t === "destroy" && e.data(this, "plugin_" + s, null)
        })
    }, e[s] = function(n) {
        var r = e(t);
        return r.stellar.apply(r, Array.prototype.slice.call(arguments, 0))
    }, e[s].scrollProperty = u, e[s].positionProperty = a, t.Stellar = i
})(jQuery, window, document);
(function(e) {
    function n(e) {
        return typeof e == "object" ? e : {
            top: e,
            left: e
        }
    }
    var t = e.scrollTo = function(t, n, r) {
            e(window).scrollTo(t, n, r)
        };
    t.defaults = {
        axis: "xy",
        duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1,
        limit: !0
    };
    t.window = function(t) {
        return e(window)._scrollable()
    };
    e.fn._scrollable = function() {
        return this.map(function() {
            var t = this,
                n = !t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!n) return t;
            var r = (t.contentWindow || t).document || t.ownerDocument || t;
            return /webkit/i.test(navigator.userAgent) || r.compatMode == "BackCompat" ? r.body : r.documentElement
        })
    };
    e.fn.scrollTo = function(r, i, s) {
        if (typeof i == "object") {
            s = i;
            i = 0
        }
        typeof s == "function" && (s = {
            onAfter: s
        });
        r == "max" && (r = 9e9);
        s = e.extend({}, t.defaults, s);
        i = i || s.duration;
        s.queue = s.queue && s.axis.length > 1;
        s.queue && (i /= 2);
        s.offset = n(s.offset);
        s.over = n(s.over);
        return this._scrollable().each(function() {
            function d(e) {
                u.animate(c, i, s.easing, e &&
                function() {
                    e.call(this, r, s)
                })
            }
            if (r == null) return;
            var o = this,
                u = e(o),
                a = r,
                l, c = {},
                p = u.is("html,body");
            switch (typeof a) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(a)) {
                    a = n(a);
                    break
                }
                a = e(a, this);
                if (!a.length) return;
            case "object":
                if (a.is || a.style) l = (a = e(a)).offset()
            }
            e.each(s.axis.split(""), function(e, n) {
                var r = n == "x" ? "Left" : "Top",
                    i = r.toLowerCase(),
                    f = "scroll" + r,
                    v = o[f],
                    m = t.max(o, n);
                if (l) {
                    c[f] = l[i] + (p ? 0 : v - u.offset()[i]);
                    if (s.margin) {
                        c[f] -= parseInt(a.css("margin" + r)) || 0;
                        c[f] -= parseInt(a.css("border" + r + "Width")) || 0
                    }
                    c[f] += s.offset[i] || 0;
                    s.over[i] && (c[f] += a[n == "x" ? "width" : "height"]() * s.over[i])
                } else {
                    var y = a[i];
                    c[f] = y.slice && y.slice(-1) == "%" ? parseFloat(y) / 100 * m : y
                }
                s.limit && /^\d+$/.test(c[f]) && (c[f] = c[f] <= 0 ? 0 : Math.min(c[f], m));
                if (!e && s.queue) {
                    v != c[f] && d(s.onAfterFirst);
                    delete c[f]
                }
            });
            d(s.onAfter)
        }).end()
    };
    t.max = function(t, n) {
        var r = n == "x" ? "Width" : "Height",
            i = "scroll" + r;
        if (!e(t).is("html,body")) return t[i] - e(t)[r.toLowerCase()]();
        var s = "client" + r,
            o = t.ownerDocument.documentElement,
            u = t.ownerDocument.body;
        return Math.max(o[i], u[i]) - Math.min(o[s], u[s])
    }
})(jQuery);
jQuery.fn.jEye = function(e) {
    e = jQuery.extend({
        xEye: 140,
        yEye: 206,
        wEye: 14,
        hEye: 8,
        wPupil: 8,
        hPupil: 8,
        eyes: 2
    }, e);
    return this.each(function(t) {
        var n = $(this),
            r = Math.floor((e.wEye - e.wPupil) / 2),
            i = Math.floor((e.hEye - e.hPupil) / 2),
            s = Math.floor((e.wEye - e.wPupil) / 2) - 1,
            u = n.position(),
            a = u.left,
            f = u.top;
        n.append("<div id='occhio" + t + "' style='position: absolute; background: transparent url(img/occhio-null.png) center center no-repeat; top: " + e.yEye + "px; left: " + e.xEye + "px; width: " + e.wEye + "px; height: " + e.hEye + "px;' >" + "<img id='pupilla" + t + "' src='img/pupilla.png' style='position: relative; top:" + i + "px; left:" + r + "px; width: " + e.wPupil + "px; height:" + e.hPupil + "px' />" + "</div>");
        if (e.eyes == 2) {
            var l = Math.floor(i - 2);
            n.append("<div id='occhiob" + t + "' style='position: absolute; background: transparent url(img/occhio-null.png) center center no-repeat; top: " + e.yEye + "px; left: " + (e.xEye + e.wEye) + "px; width: " + e.wEye + "px; height: " + e.hEye + "px; margin-left:28px;' >" + "<img id='pupillab" + t + "' src='img/pupilla.png' style='position: relative; top:" + l + "px; left:" + r + "px; width: " + e.wPupil + "px; height:" + e.hPupil + "px' />" + "</div>")
        }
        n.mousemove(function(n) {
            var r = 4,
                i = n.pageY - f,
                u = n.pageX - a,
                l = e.xEye + 19,
                c = e.yEye + 8;
            ang = Math.atan((c - i) / (u - l));
            l > u && (ang += Math.PI);
            $("#pupilla" + t).css("top", s - Math.floor(Math.sin(ang) * r) + "px").css("left", Math.floor(Math.cos(ang) * r) + s + "px");
            if (e.eyes == 2) {
                u -= e.wEye;
                ang = Math.atan((c - i) / (u - l));
                l > u && (ang += Math.PI);
                $("#pupillab" + t).css("top", s - Math.floor(Math.sin(ang) * r) + "px").css("left", Math.floor(Math.cos(ang) * r) + s + "px")
            }
        })
    })
};
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(e, t, n, r, i) {
        return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
    },
    easeInQuad: function(e, t, n, r, i) {
        return r * (t /= i) * t + n
    },
    easeOutQuad: function(e, t, n, r, i) {
        return -r * (t /= i) * (t - 2) + n
    },
    easeInOutQuad: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function(e, t, n, r, i) {
        return r * (t /= i) * t * t + n
    },
    easeOutCubic: function(e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t + 1) + n
    },
    easeInOutCubic: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function(e, t, n, r, i) {
        return r * (t /= i) * t * t * t + n
    },
    easeOutQuart: function(e, t, n, r, i) {
        return -r * ((t = t / i - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function(e, t, n, r, i) {
        return r * (t /= i) * t * t * t * t + n
    },
    easeOutQuint: function(e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
    },
    easeInSine: function(e, t, n, r, i) {
        return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
    },
    easeOutSine: function(e, t, n, r, i) {
        return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeInOutSine: function(e, t, n, r, i) {
        return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
    },
    easeInExpo: function(e, t, n, r, i) {
        return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
    },
    easeOutExpo: function(e, t, n, r, i) {
        return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
    },
    easeInOutExpo: function(e, t, n, r, i) {
        return t == 0 ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
    },
    easeInCirc: function(e, t, n, r, i) {
        return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
    },
    easeOutCirc: function(e, t, n, r, i) {
        return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
    },
    easeInOutCirc: function(e, t, n, r, i) {
        return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
    },
    easeInElastic: function(e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        o || (o = i * .3);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
    },
    easeOutElastic: function(e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        o || (o = i * .3);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
    },
    easeInOutElastic: function(e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i / 2) == 2) return n + r;
        o || (o = i * .3 * 1.5);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n : u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
    },
    easeInBack: function(e, t, n, r, i, s) {
        s == undefined && (s = 1.70158);
        return r * (t /= i) * t * ((s + 1) * t - s) + n
    },
    easeOutBack: function(e, t, n, r, i, s) {
        s == undefined && (s = 1.70158);
        return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
    },
    easeInOutBack: function(e, t, n, r, i, s) {
        s == undefined && (s = 1.70158);
        return (t /= i / 2) < 1 ? r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n : r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
    },
    easeInBounce: function(e, t, n, r, i) {
        return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
    },
    easeOutBounce: function(e, t, n, r, i) {
        return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
    },
    easeInOutBounce: function(e, t, n, r, i) {
        return t < i / 2 ? jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n : jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
    }
});
(function(e) {
    e.fn.popupWindow = function(t) {
        return this.each(function() {
            e(this).click(function() {
                e.fn.popupWindow.defaultSettings = {
                    centerBrowser: 0,
                    centerScreen: 0,
                    height: 500,
                    left: 0,
                    location: 0,
                    menubar: 0,
                    resizable: 0,
                    scrollbars: 0,
                    status: 0,
                    width: 500,
                    windowName: null,
                    windowURL: null,
                    top: 0,
                    toolbar: 0
                };
                settings = e.extend({}, e.fn.popupWindow.defaultSettings, t || {});
                var n = "height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars + ",status=" + settings.status + ",resizable=" + settings.resizable + ",location=" + settings.location + ",menuBar=" + settings.menubar;
                settings.windowName = this.name || settings.windowName;
                settings.windowURL = this.href || settings.windowURL;
                var r, i;
                if (settings.centerBrowser) {
                    if (e.browser.msie) {
                        r = window.screenTop - 120 + ((document.documentElement.clientHeight + 120) / 2 - settings.height / 2);
                        i = window.screenLeft + ((document.body.offsetWidth + 20) / 2 - settings.width / 2)
                    } else {
                        r = window.screenY + (window.outerHeight / 2 - settings.height / 2);
                        i = window.screenX + (window.outerWidth / 2 - settings.width / 2)
                    }
                    window.open(settings.windowURL, settings.windowName, n + ",left=" + i + ",top=" + r).focus()
                } else if (settings.centerScreen) {
                    r = (screen.height - settings.height) / 2;
                    i = (screen.width - settings.width) / 2;
                    window.open(settings.windowURL, settings.windowName, n + ",left=" + i + ",top=" + r).focus()
                } else window.open(settings.windowURL, settings.windowName, n + ",left=" + settings.left + ",top=" + settings.top).focus();
                return !1
            })
        })
    }
})(jQuery);
(function(e, t, n) {
    function f(e) {
        var t = {},
            r = /^jQuery\d+$/;
        n.each(e.attributes, function(e, n) {
            n.specified && !r.test(n.name) && (t[n.name] = n.value)
        });
        return t
    }
    function l(e, r) {
        var i = this,
            s = n(i);
        if (i.value == s.attr("placeholder") && s.hasClass("placeholder")) if (s.data("placeholder-password")) {
            s = s.hide().next().show().attr("id", s.removeAttr("id").data("placeholder-id"));
            if (e === !0) return s[0].value = r;
            s.focus()
        } else {
            i.value = "";
            s.removeClass("placeholder");
            i == t.activeElement && i.select()
        }
    }
    function c() {
        var e, t = this,
            r = n(t),
            i = r,
            s = this.id;
        if (t.value == "") {
            if (t.type == "password") {
                if (!r.data("placeholder-textinput")) {
                    try {
                        e = r.clone().attr({
                            type: "text"
                        })
                    } catch (o) {
                        e = n("<input>").attr(n.extend(f(this), {
                            type: "text"
                        }))
                    }
                    e.removeAttr("name").data({
                        "placeholder-password": !0,
                        "placeholder-id": s
                    }).bind("focus.placeholder", l);
                    r.data({
                        "placeholder-textinput": e,
                        "placeholder-id": s
                    }).before(e)
                }
                r = r.removeAttr("id").hide().prev().attr("id", s).show()
            }
            r.addClass("placeholder");
            r[0].value = r.attr("placeholder")
        } else r.removeClass("placeholder")
    }
    var r = "placeholder" in t.createElement("input"),
        i = "placeholder" in t.createElement("textarea"),
        s = n.fn,
        o = n.valHooks,
        u, a;
    if (r && i) {
        a = s.placeholder = function() {
            return this
        };
        a.input = a.textarea = !0
    } else {
        a = s.placeholder = function() {
            var e = this;
            e.filter((r ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
                "focus.placeholder": l,
                "blur.placeholder": c
            }).data("placeholder-enabled", !0).trigger("blur.placeholder");
            return e
        };
        a.input = r;
        a.textarea = i;
        u = {
            get: function(e) {
                var t = n(e);
                return t.data("placeholder-enabled") && t.hasClass("placeholder") ? "" : e.value
            },
            set: function(e, r) {
                var i = n(e);
                if (!i.data("placeholder-enabled")) return e.value = r;
                if (r == "") {
                    e.value = r;
                    e != t.activeElement && c.call(e)
                } else i.hasClass("placeholder") ? l.call(e, !0, r) || (e.value = r) : e.value = r;
                return i
            }
        };
        r || (o.input = u);
        i || (o.textarea = u);
        n(function() {
            n(t).delegate("form", "submit.placeholder", function() {
                var e = n(".placeholder", this).each(l);
                setTimeout(function() {
                    e.each(c)
                }, 10)
            })
        });
        n(e).bind("beforeunload.placeholder", function() {
            n(".placeholder").each(function() {
                this.value = ""
            })
        })
    }
})(this, document, jQuery);